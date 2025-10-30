import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- INLINE SVG ICON for alerts (reused from Login page) ---
const IconAlert = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
);

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Custom alert/modal state
  const [modal, setModal] = useState({ message: '', visible: false, title: '', type: '' });
  const showModal = (message, title, type) => setModal({ message, visible: true, title, type });
  const closeModal = () => setModal({ message: '', visible: false, title: '', type: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.firstname || !form.lastname || !form.email || !form.password) {
      setLoading(false);
      showModal("Please fill in all fields to complete registration.", "Validation Error", "error");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        showModal("Registered successfully! You can now log in.", "Success", "success");
        // Wait briefly for user to see the success message, then navigate
        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {
        showModal(data.message || "Registration failed due to a server issue or existing user.", "Registration Failed", "error");
      }
    } catch (err) {
      setLoading(false);
      console.error("Registration error:", err);
      showModal("An error occurred while connecting to the server. Please try again.", "Connection Error", "error");
    }
  };

  const isSuccess = modal.type === 'success';
  const modalBorderColor = isSuccess ? 'border-green-500' : 'border-red-500';
  const modalIconColor = isSuccess ? 'text-green-500' : 'text-red-500';


  return (
    // Vertical padding adjustment remains for centering
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 pt-24">
      
      {/* Custom Modal/Alert (omitted for brevity) */}
      {modal.visible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border-t-8 ${modalBorderColor}`}>
            <IconAlert className={`w-8 h-8 mx-auto mb-3 ${modalIconColor}`} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{modal.title}</h3>
            <p className="text-gray-600 mb-6">{modal.message}</p>
            {!isSuccess && ( 
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition shadow-sm"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}

      {/* Register Card */}
      {/* *** CARD SIZE: Increased back to max-w-md (448px) for two columns *** */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-pink-600">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-lg text-gray-500 mb-8 text-center border-b pb-4">
          Start your personalized health journey
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          
          {/* --- NAME FIELDS: Two-Column Layout (on sm: and larger) --- */}
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="border border-gray-300 px-4 py-3 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition shadow-sm"
              value={form.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="border border-gray-300 px-4 py-3 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition shadow-sm"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
          {/* --- END NAME FIELDS --- */}
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition shadow-sm"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition shadow-sm"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-xl font-bold text-lg shadow-md transition transform ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-pink-600 hover:bg-pink-700 hover:scale-[1.01]'}`}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Already have an account? 
          <button 
            onClick={() => navigate("/login")} 
            className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1 transition"
            disabled={loading}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
