import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import NavbarDashboard from "./components/NavbarDashboard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetectionPage from "./pages/DetectionPage";
import PlannerPage from "./pages/PlannerPage";
import ProfilePage from "./pages/ProfilePage";
import Features from './pages/Features'; 
import About from './pages/About'; 

// 👇 Imports for Chatbot
import ChatbotPage from './pages/ChatbotPage'; 
//import FloatingChatbot from "./pages/FloatingChatbot"; // This is the component we want to float

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      setIsAuth(!!token);
      setUser(storedUser ? JSON.parse(storedUser) : null);
   };

    syncAuth();
    window.addEventListener("authChange", syncAuth);
    return () => window.removeEventListener("authChange", syncAuth);
  }, []);

  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" replace />;
};

  return (
    <Router>
      {/* ✅ Show proper Navbar based on login */}
      {isAuth ? <NavbarDashboard user={user} /> : <Navbar />}

      <main className="pt-20">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/features" element={<Features />} /> 
          <Route path="/about" element={<About />} />
          
          {/* Route for the full-page chatbot (kept for completeness) */}
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* Protected routes */}
          <Route path="/detect" element={<PrivateRoute element={<DetectionPage />} />} />
          <Route path="/planner/:vitamin" element={<PrivateRoute element={<PlannerPage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
      </main>
      
      {/* 🚀 SOLUTION: Place FloatingChatbot outside of <main> and <Routes> 
          so it is fixed and visible on all pages. */}
      {/*<FloatingChatbot />*/}
      
    </Router>
  );
}

export default App;