import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
// Note: This file will be named DetectionPage.jsx for clarity, 
// assuming it's the file containing the component you provided.

// --- INLINE SVG ICONS for a clean look ---  
const IconUpload = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const IconPlan = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14"/><line x1="7" y1="11" x2="17" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/><line x1="7" y1="7" x2="7" y2="7"/></svg>
);
const IconFlask = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H2V22h20V9.5"/><polyline points="18 2 22 6 18 10"/><line x1="12" y1="12" x2="17" y2="7"/><path d="M12 22v-3"/><path d="M5 13H2"/><path d="M22 13H19"/></svg>
);
const IconAlert = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
);

// Helper function to map detailed deficiencies to the consolidated planner keys
const mapToPlannerKey = (deficiency) => {
  const upperDeficiency = deficiency.toUpperCase();
  if (upperDeficiency.includes("B1") || upperDeficiency.includes("B2") || upperDeficiency.includes("B3") || upperDeficiency.includes("B9") || upperDeficiency.includes("B12")) {
    return "B-Vitamin";
  }
  if (upperDeficiency.includes("IRON") || upperDeficiency.includes("ZINC") || upperDeficiency.includes("BIOTIN") || upperDeficiency.includes("PROTEIN")) {
    return "Protein-Mineral";
  }
  // Remove "deficiency" and spaces for exact matches like VitaminC, VitaminA
  return deficiency.replace(/ deficiency/i, "").replace(/\s/g, "");
};

// --- Component Definition ---

export default function DetectionPage() {
  const navigate = useNavigate();

  // Removed cameraActive, videoRef, capturedImage states
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Ref for file input trigger

  // Custom alert/modal state
  const [modal, setModal] = useState({ message: '', visible: false, title: 'Error' });
  const showModal = (message, title = 'Error') => setModal({ message, visible: true, title });
  const closeModal = () => setModal({ message: '', visible: false, title: 'Error' });

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create object URL for preview and reset results
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // Upload to backend (reverted to original fetch logic)
  const uploadImage = async (imageData) => {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("image", imageData);

      // --- CRITICAL: Using the user's local backend URL ---
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        const newResult = {
          disease: data.predicted_disease || "N/A",
          deficiency: data.vitamin_deficiency || "Unknown Deficiency",
          confidence: data.confidence || 0.0,
        };

        setResult(newResult);
        showModal("Detection Successful! View your personalized diet plan.", "Success");

        // ✅ Save detection to history (for Profile page)
        try {
          const token = localStorage.getItem("token");
          await fetch("http://127.0.0.1:5000/save_detection", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              deficiency: newResult.deficiency,
              disease: newResult.disease,
              confidence: newResult.confidence * 100, // convert to %
            }),
          });
        } catch (err) {
          console.error("Failed to save history:", err);
        }
      }
      else {
        showModal(data.message || "Prediction failed due to server error.", "Prediction Failed");
      }
    } catch (err) {
      setLoading(false);
      showModal("Error connecting to the detection service. Please ensure the backend server is running at http://127.0.0.1:5000.", "Connection Error");
      console.error(err);
    }
  };

  // Detect button click for uploaded image
  const handleDetect = async () => {
    setResult(null);
    if (!selectedImage) return showModal("Please select an image first to start detection.");

    // Fetch the blob from the selected image URL (necessary for FormData upload)
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    await uploadImage(blob);
  };

  // Handle "View Planner" button click
  const handleViewPlanner = () => {
    if (result && result.deficiency) {
      const plannerKey = mapToPlannerKey(result.deficiency);
      navigate(`/planner/${plannerKey}`); 
    }
  };

  // Classic Blue Palette Colors
  const primaryColor = 'indigo-600';
  const buttonHover = 'indigo-700';

  return (
    // *** MAIN CONTAINER: Light bluish background ***
    <div className={`min-h-screen bg-indigo-50 flex flex-col items-center pt-24 px-4 md:px-8 transition-all duration-500`}>
      
      {/* Custom Modal/Alert */}
      {modal.visible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border-t-8 border-red-500">
            <IconAlert className={`w-8 h-8 mx-auto mb-3 ${modal.title.includes('Error') ? 'text-red-500' : 'text-green-500'}`} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{modal.title}</h3>
            <p className="text-gray-600 mb-6">{modal.message}</p>
            <button
              onClick={closeModal}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition shadow-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div className={`w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border-t-4 border-${primaryColor} animate-fade-in`}> 
        
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          <IconFlask className={`inline w-8 h-8 mr-2 -mt-1 text-${primaryColor}`} />
          Nutritional Analysis
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center border-b pb-4">
          Upload Image for Deficiency Detection
        </p>

        {/* --- UPLOAD BUTTON / CALL TO ACTION --- */}
        <div className="mb-8">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current.click()}
                disabled={loading}
                className={`w-full flex items-center justify-center bg-${primaryColor} text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-${buttonHover} transition transform hover:scale-[1.01] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <IconUpload className="w-6 h-6 mr-3" />
                {selectedImage ? 'Change Image' : 'Select Image File'}
            </button>
        </div>

        {/* --- UPLOADED IMAGE PREVIEW & DETECT BUTTON --- */}
        {selectedImage && (
          <div className="mt-6 w-full flex flex-col items-center p-4 border border-indigo-200 bg-indigo-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Image for Analysis:</h3>
            <img 
                src={selectedImage} 
                alt="Uploaded" 
                className="rounded-lg shadow-md w-full max-h-80 object-contain mb-6 border border-gray-300" 
            />
            <button
              onClick={handleDetect}
              disabled={loading}
              className={`bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition w-full text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Analyzing...' : 'Run Detection Analysis'}
            </button>
          </div>
        )}

        {/* --- LOADING INDICATOR --- */}
        {loading && (
            <div className={`mt-8 text-center flex justify-center items-center space-x-3 text-${primaryColor} p-4 border rounded-xl border-indigo-300 bg-indigo-100 shadow-md`}>
              <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="font-semibold text-lg">Analyzing image... Standby.</p>
            </div>
        )}

        {/* --- RESULTS AND PLANNER BUTTON --- */}
        {result && (
          <div className="mt-8 w-full bg-green-50 p-6 rounded-xl shadow-lg border-l-4 border-green-500 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Analysis Results:</h3>
            <div className="space-y-3">
                <p className="text-lg font-medium text-gray-800 flex justify-between">
                    <span className="text-gray-600">Disease/Symptom:</span>
                    <span className={`font-semibold text-${primaryColor}`}>{result.disease}</span>
                </p>
                <p className="text-lg font-medium text-gray-800 flex justify-between">
                    <span className="text-gray-600">Vitamin Deficiency:</span>
                    <span className="font-extrabold text-green-700">{result.deficiency}</span>
                </p>
                <p className="text-lg font-medium text-gray-800 flex justify-between">
                    <span className="text-gray-600">Confidence Score:</span>
                    <span className="font-bold text-red-600">{(result.confidence * 100).toFixed(2)}%</span>
                </p>
            </div>

            <button
              onClick={handleViewPlanner}
              className={`mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition w-full flex items-center justify-center transform hover:scale-[1.01]`}
            >
              <IconPlan className="w-6 h-6 mr-2"/>
              View Personalized Nutritional Planner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
