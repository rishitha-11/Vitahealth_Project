import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BeakerIcon } from '@heroicons/react/24/outline'; 
// Assuming NavbarDashboard is imported correctly in the real file structure
// import NavbarDashboard from "../components/NavbarDashboard"; 

// --- LOCAL STORAGE KEY GENERATOR ---
const getLocalStorageKey = (vitamin) => `planner_progress_${vitamin}`;

export default function PlannerPage() {
  const { vitamin } = useParams();
  const navigate = useNavigate();
  const [dietPlan, setDietPlan] = useState([]);
  const [vitaminFact, setVitaminFact] = useState("");
  const [hasDetection, setHasDetection] = useState(true);
  const [loading, setLoading] = useState(true);
  // State to track completed DAYS
  const [completedDays, setCompletedDays] = useState({}); 

  // --- Progress Calculation ---
  const totalDays = dietPlan.length;
  const completedCount = Object.values(completedDays).filter(isDone => isDone).length;
  const progressPercentage = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const isDayCompleted = (dayKey) => !!completedDays[dayKey];

  // --- Toggle Handler with Local Storage Persistence ---
  const handleDayToggle = (dayKey, checked) => {
    // 1. Update the local state
    const newCompletedDays = {
        ...completedDays,
        [dayKey]: checked,
    };
    setCompletedDays(newCompletedDays);

    // 2. Persist the progress immediately to localStorage for testing
    localStorage.setItem(getLocalStorageKey(vitamin), JSON.stringify(newCompletedDays));

    // 3. Optional: Trigger dashboard/global refresh (using the previous logic)
    localStorage.setItem("progress_updated", Date.now().toString());
    window.dispatchEvent(new Event("storage"));

    // NOTE: If you restore your backend endpoints, put the fetch logic here.
  };
  
  // --- Data Fetching Effect ---

  useEffect(() => {
    const fetchPlannerData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // 1. Check for detection history (unchanged)
        const historyRes = await fetch("http://127.0.0.1:5000/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const historyData = await historyRes.json();

        if (!Array.isArray(historyData) || historyData.length === 0) {
          setHasDetection(false);
          return;
        }

        const userDeficiencies = historyData.map((item) =>
          item.deficiency.replace("Deficiency", "").replace(/\s+/g, "").toLowerCase()
        );

        if (!userDeficiencies.includes(vitamin.toLowerCase())) {
          setHasDetection(false);
          return;
        }

        // 2. Fetch the plan details (unchanged)
        const planRes = await fetch(`http://127.0.0.1:5000/planner/${vitamin}`);
        const planData = await planRes.json();
        const loadedDietPlan = planData.plan || [];
        setDietPlan(loadedDietPlan);
        setVitaminFact(planData.fact || "");

        // 3. Load progress from Local Storage for front-end testing
        const savedProgressJson = localStorage.getItem(getLocalStorageKey(vitamin));
        const savedProgress = savedProgressJson ? JSON.parse(savedProgressJson) : {};
        
        // Initialize completedDays state, ensuring all current days are represented
        const initialProgress = loadedDietPlan.reduce((acc, day) => {
            // Use saved value if it exists, otherwise default to false
            acc[day.day] = savedProgress[day.day] || false; 
            return acc;
        }, {});

        setCompletedDays(initialProgress);
        
      } catch (err) {
        console.error("Planner fetch error:", err);
        setHasDetection(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPlannerData();
  }, [vitamin]); 

  // --- Styling helpers ---
  const mealColors = {
    Breakfast: "bg-blue-50 text-blue-800",
    Lunch: "bg-yellow-50 text-yellow-800",
    Dinner: "bg-green-50 text-green-800",
    Snack: "bg-pink-50 text-pink-800",
  };
  
  // The handleDownload function remains the same
  const handleDownload = () => {
    window.open(`http://127.0.0.1:5000/generate-report?vita=${vitamin}`, "_blank");
  };

  // --- Component Renders (unchanged styling) ---

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-indigo-50 text-gray-600 pt-16">
        <svg className="animate-spin h-8 w-8 text-indigo-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold">Loading your personalized plan...</p>
      </div>
    );
  }

  if (!hasDetection) {
    return (
      <div className="min-h-screen bg-indigo-50 text-gray-800 flex items-center justify-center pt-16">
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-xl max-w-lg">
          <BeakerIcon className="w-12 h-12 text-pink-600 mb-4"/>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            No Active Planner Available
          </h1>
          <p className="text-gray-600 mb-4">
            It looks like you haven't completed a successful vitamin deficiency detection yet, or the current plan has expired.
          </p>
          <button
            onClick={() => navigate('/detect')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Start Deficiency Detection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-800 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* --- HEADER: Title and Progress Bar --- */}
        <div className="mb-10 p-6 bg-white rounded-xl shadow-xl border-t-4 border-indigo-600">
            
            <h1 className="text-4xl font-extrabold text-gray-800 mb-1">
              Your Personalized <span className="text-pink-600">{vitamin}</span> Planner
            </h1>
            <p className="text-lg text-gray-500 mb-6">{vitaminFact}</p>

            {/* PROGRESS BAR */}
            <div className="mt-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-indigo-700">PLAN PROGRESS</span>
                    <span className="text-sm font-semibold text-indigo-700">{completedCount} / {totalDays} Days Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                        className="bg-green-500 h-3 rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8 }}
                        role="progressbar"
                        aria-valuenow={progressPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></motion.div>
                </div>
                <p className="text-right mt-1 text-sm font-bold text-green-600">{progressPercentage}% Complete</p>
            </div>
        </div>

        {/* --- MEAL CARDS (Grid Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietPlan.map((day, index) => {
            const dayKey = day.day; 
            const isDone = isDayCompleted(dayKey);
            
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 border-l-4 ${isDone ? 'border-green-500 shadow-green-200' : 'border-indigo-300'}`}
                whileHover={{ y: -3 }}
              >
                {/* Day Header and Checkbox */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h3 className={`text-xl font-bold ${isDone ? 'text-green-700' : 'text-indigo-700'}`}>
                    {dayKey}
                  </h3>
                  
                  {/* Single "Day Done" Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer text-sm font-semibold">
                    <span className={isDone ? 'text-green-700' : 'text-gray-500'}>
                        {isDone ? 'DONE' : 'MARK AS DONE'}
                    </span>
                    <input
                      type="checkbox"
                      // Use the isDone variable from the state for the 'checked' attribute
                      checked={isDone} 
                      // Use handleDayToggle with the current dayKey and the new checked value
                      onChange={(e) => handleDayToggle(dayKey, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                    />
                  </label>
                </div>
                
                {/* Meals List */}
                <div className="space-y-3">
                    {day.meals.map((meal, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg flex flex-col ${mealColors[meal.type] || "bg-gray-100"}`}
                      >
                        <b className="text-sm">{meal.type}:</b> 
                        <span className="text-base font-medium">{meal.food}</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* --- Optional: Download Report Button (Moved to bottom) --- */}
        <div className="mt-10 text-center">
            <button
              onClick={handleDownload}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-[1.01] flex items-center mx-auto"
            >
              Download Full PDF Report
            </button>
        </div>
        
      </div>
    </div>
  );
}
