from flask import Flask, request, jsonify, send_file # <-- Added send_file
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
import gdown
import tempfile
from vitamin_data.diet_data import vitamin_diets

# === PDF GENERATION IMPORTS ===
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
# === END PDF IMPORTS ===


# === Import model utilities ===
from model.model_utils import (
    load_vitamin_model,
    load_class_indices,
    load_mapping,
    predict_vitamin_deficiency
)

# === Configuration ===
app = Flask(__name__)
CORS(app)
SECRET_KEY = os.environ.get("VITAMIN_SECRET_KEY", "vitamin_secret_key")
DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# === Load Model Once on Startup ===
#MODEL_PATH = os.path.join('model', 'vitamin_deficiency_model .h5')
#JSON_PATH = os.path.join("model", "class_indices.json")
DRIVE_FILE_ID = '1WWbeQGkNBZg1vRKimuJXEo8zVMASP6sQ'
MODEL_FILENAME = 'vitamin_deficiency_model.h5'
MODEL_PATH = os.path.join(tempfile.gettempdir(), MODEL_FILENAME) # <-- Use tempfile
JSON_PATH = os.path.join("model", "class_indices.json")
CSV_PATH = os.path.join("model", "vitamin_deficiency_data.csv")
# Before Line 41:
def download_model_if_missing():
    """Downloads the model from Google Drive if it doesn't exist locally."""
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Google Drive...")
        try:
            # gdown will download the file, handling the large file warning automatically
            gdown.download(id=DRIVE_FILE_ID, output=MODEL_PATH, quiet=False)
            print("Model download complete.")
        except Exception as e:
            print(f"Error downloading model: {e}")
            # You might want to exit the app or raise the exception here
            raise e
    else:
        print("Model file already exists in /tmp. Skipping download.")

download_model_if_missing()
model = load_vitamin_model(MODEL_PATH)
class_indices = load_class_indices(JSON_PATH)
mapping = load_mapping(CSV_PATH)

# === Database Utility ===
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# === Init DB ===
def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname TEXT,
            lastname TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS detections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            deficiency TEXT,
            confidence REAL,
            timestamp TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    """)
    conn.commit()
    conn.close()

init_db()

# === Register Route ===
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")

    if not firstname or not lastname or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
            (firstname, lastname, email, hashed_password),
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully!"})
    except sqlite3.IntegrityError:
        return jsonify({"message": "User already exists"}), 400

# === Login Route ===
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()

    if not row:
        return jsonify({"message": "User not found"}), 400
    if not check_password_hash(row["password"], password):
        return jsonify({"message": "Invalid password"}), 401

    payload = {
        "id": row["id"],
        "email": row["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "firstname": row["firstname"],
        "email": row["email"],
    })

# === Profile Route ===
@app.route("/profile", methods=["GET"])
def profile():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header

    if not token:
        return jsonify({"message": "No token provided"}), 403

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT firstname, lastname, email FROM users WHERE id = ?", (decoded["id"],))
    user = cur.fetchone()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "firstname": user["firstname"],
        "lastname": user["lastname"],
        "email": user["email"]
    })
# === Save Detection ===
@app.route("/save_detection", methods=["POST"])
def save_detection():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header
    if not token:
        return jsonify({"message": "No token"}), 403
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    data = request.get_json() or {}
    deficiency = data.get("deficiency")
    confidence = data.get("confidence")

    if not deficiency:
        return jsonify({"message": "Missing deficiency"}), 400

    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO detections (user_id, deficiency, confidence, timestamp) VALUES (?, ?, ?, ?)",
        (decoded["id"], deficiency, confidence, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Detection saved successfully"}), 200


# === Get Detection History ===
@app.route("/history", methods=["GET"])
def history():
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header

    if not token:
        return jsonify({"message": "No token"}), 403

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, deficiency, confidence, timestamp FROM detections WHERE user_id = ? ORDER BY id DESC",
        (decoded["id"],),
    )
    rows = cur.fetchall()
    conn.close()

    # ✅ Always return as array, even if empty
    history_data = [dict(r) for r in rows]
    return jsonify(history_data)


# === Delete Detection ===
@app.route("/history/<int:history_id>", methods=["DELETE"])
def delete_history(history_id):
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else auth_header
    if not token:
        return jsonify({"message": "No token"}), 403
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM detections WHERE id = ? AND user_id = ?", (history_id, decoded["id"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted successfully"}), 200

@app.route('/planner/<vitamin>', methods=['GET'])
def get_planner(vitamin):
    # Normalize to match dict keys exactly (case-insensitive)
    for key in vitamin_diets.keys():
        if key.lower() == vitamin.lower():
            return jsonify(vitamin_diets[key])
    return jsonify({"error": f"No data found for {vitamin}"}), 404
# === Meal Progress Tracking System ===

def create_meal_table():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS meal_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            vitamin TEXT,
            day TEXT,
            meal_type TEXT,
            completed INTEGER DEFAULT 0,
            UNIQUE(user_id, vitamin, day, meal_type)
        )
    ''')
    conn.commit()
    conn.close()

create_meal_table()

@app.route("/update_meal", methods=["POST"])
def update_meal():
    data = request.get_json()
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["id"]
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    vitamin = data.get("vitamin")
    day = data.get("day")
    meal_type = data.get("meal_type")
    completed = 1 if data.get("completed") else 0

    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO meal_progress (user_id, vitamin, day, meal_type, completed)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, vitamin, day, meal_type)
        DO UPDATE SET completed=excluded.completed
    """, (user_id, vitamin, day, meal_type, completed))
    conn.commit()
    conn.close()

    return jsonify({"message": "Meal progress updated successfully"}), 200


@app.route("/vitamin_progress/<vitamin>", methods=["GET"])
def vitamin_progress(vitamin):
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["id"]
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT day, COUNT(*) AS total, SUM(completed) AS done
        FROM meal_progress
        WHERE user_id=? AND vitamin=?
        GROUP BY day
    """, (user_id, vitamin))
    data = cur.fetchall()
    conn.close()

    result = {}
    for d in data:
        done = d["done"] or 0
        total = d["total"] or 0
        result[d["day"]] = round((done / total) * 100, 1) if total else 0

    return jsonify(result)


# === Prediction Route (CORRECTED) ===
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"message": "No image uploaded"}), 400

    img = request.files["image"]
    save_path = os.path.join(UPLOAD_FOLDER, img.filename)
    img.save(save_path)

    try:
        result = predict_vitamin_deficiency(model, class_indices, mapping, save_path)
        # ✅ Return keys matching frontend
        return jsonify({
            "predicted_disease": result["predicted_disease"],
            "vitamin_deficiency": result["mapped_deficiency"],
            "confidence": float(result["confidence"])
        })
    except Exception as e:
        return jsonify({"message": f"Prediction error: {str(e)}"}), 500

# === Home Route ===
@app.route("/", methods=["GET"])
def home():
    return "✅ Flask backend for Vitamin Detection running successfully!"

# --- NEW PDF GENERATION ROUTE ---
# Helper function to fetch and format plan data
def get_planner_details_for_pdf(vitamin_key):
    # Normalize the key (e.g., 'VitaminB12' or 'VitaminA' to match dictionary keys)
    normalized_key = vitamin_key.replace(" ", "") 
    
    if normalized_key in vitamin_diets:
        plan_data = vitamin_diets[normalized_key]
        
        # Format the plan details into a clean list of strings for the PDF
        formatted_plan = [f"Fact: {plan_data.get('fact', 'N/A')}"]
        formatted_plan.append(f"RDA Goal: {plan_data.get('rda', 'N/A')} \u00B5g")
        formatted_plan.append("-" * 30)
        
        for day in plan_data.get("plan", []):
            formatted_plan.append(f"-> {day['day']} (Goal: {day['intake_percent']}%)")
            for meal in day['meals']:
                formatted_plan.append(f"   - {meal['type']}: {meal['food']} ({meal['nutrients']})")
        
        return formatted_plan
    
    return ["Planner data not found for this deficiency."]


@app.route('/generate-report', methods=['GET'])
def generate_report():
    # 1. Get the vitamin key from the URL query parameter
    vitamin = request.args.get('vita')
    
    if not vitamin:
        return {"error": "Vitamin parameter (vita) is missing."}, 400

    # 2. Get the full plan data (which is now a list of strings)
    plan_lines = get_planner_details_for_pdf(vitamin)
    
    # Check if data was found
    if plan_lines == ["Planner data not found for this deficiency."]:
        return {"error": plan_lines[0]}, 404

    # 3. Use BytesIO to create the PDF in memory
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # --- PDF Content Generation ---
    width, height = letter
    line_height = 14
    
    # Header
    p.setFont("Helvetica-Bold", 18)
    p.drawString(50, height - 50, "VitaHealth Nutritional Report")
    
    p.setFont("Helvetica", 14)
    p.drawString(50, height - 80, f"Planner for: {vitamin} Deficiency")
    
    p.setFont("Helvetica", 10)
    p.drawString(50, height - 120, "This report summarizes your personalized diet plan:")
    
    # Adding the detailed plan lines
    p.setFont("Helvetica", 10)
    text_y = height - 140
    
    for line in plan_lines:
        if text_y < 50:  # Check if we need a new page
            p.showPage()
            # Start new page content
            p.setFont("Helvetica-Bold", 12)
            text_y = height - 50
            p.drawString(50, text_y, "VitaHealth Report (Continued)")
            text_y -= line_height
        
        # Adjust indentation for a cleaner look based on line prefix
        indent = 50
        if line.startswith('->'):
            indent = 70
        elif line.startswith('   -'):
            indent = 90
            
        p.drawString(indent, text_y, line.strip())
        text_y -= line_height

    # --- End PDF Content Generation ---
    
    p.showPage()
    p.save()
    
    # Move buffer position to the start
    buffer.seek(0)
    
    # 4. Send the file to the browser
    return send_file(
        buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f'VitaHealth_Report_{vitamin}.pdf'
    )
# --- END NEW PDF GENERATION ROUTE ---

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
