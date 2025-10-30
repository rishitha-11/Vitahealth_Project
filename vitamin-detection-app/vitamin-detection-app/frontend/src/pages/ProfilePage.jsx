import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- SVG ICONS ---
const IconUser = (p) => (
  <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = (p) => (
  <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16v16H4z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconHistory = (p) => (
  <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4"/><path d="M22 10h-4"/><path d="M20.9 15.8a9 9 0 1 1-6.7-14.8"/><path d="M12 12L16 16"/>
  </svg>
);
const IconTrash = (p) => (
  <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6l1-3h4l1 3"/>
  </svg>
);

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🟦 Redirect if token missing
  useEffect(() => {
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [token, navigate]);

  // 🟦 Fetch user info
  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:5000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => console.error("Error loading profile"));
  }, [token, navigate]);

  // 🟦 Fetch detection history
  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:5000/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("History response:", data);
        if (Array.isArray(data)) {
          setHistory(data);
        } else if (data && Array.isArray(data.history)) {
          setHistory(data.history);
        } else {
          setHistory([]);
        }
      })
      .catch((err) => {
        console.error("Error loading history:", err);
        setHistory([]);
      });
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await fetch(`http://127.0.0.1:5000/history/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  // ✅ Map deficiency name to planner key
  const getPlannerKey = (deficiencyName) => {
    if (!deficiencyName) return "VitaminA";
    const clean = deficiencyName
      .replace("Deficiency", "")
      .replace(/\s+/g, "")
      .trim();
    return clean;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 font-sans">
      <div className="max-w-5xl mx-auto py-10 space-y-10">

        {/* --- User Header --- */}
        <div className="bg-white p-6 shadow-md rounded-2xl flex justify-between items-center border-b-4 border-indigo-600">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <IconUser className="w-8 h-8 mr-3 text-indigo-600" /> Profile
          </h1>
        </div>

        {/* --- Profile Info --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p><strong>First Name:</strong> {profile.firstname}</p>
            <p><strong>Last Name:</strong> {profile.lastname}</p>
            <p className="col-span-2 flex items-center">
              <IconMail className="w-5 h-5 mr-2" /> {profile.email}
            </p>
          </div>
        </div>

        {/* --- Detection History --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-3 flex items-center">
            <IconHistory className="w-6 h-6 mr-2" /> Detection History
          </h2>

          {history.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-6">No detections yet.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex justify-between items-center bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {h.deficiency} ({h.confidence?.toFixed(2)}%)
                    </p>
                    <p className="text-gray-600 text-sm">{h.timestamp}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/planner/${getPlannerKey(h.deficiency)}`)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
                    >
                      View Planner
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <IconTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
