import { useNavigate } from "react-router-dom";
import { useState } from "react";
// 1. Import useLocation from react-router-dom
import { useLocation } from "react-router-dom"; 
import { Bars3Icon, XMarkIcon, UserCircleIcon, SunIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function NavbarDashboard({ user }) {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation here to get the path
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("firstname");
    localStorage.removeItem("email");
    sessionStorage.clear();

    // 🔥 Notify App.js about logout
    window.dispatchEvent(new Event("authChange"));

    setOpenMenu(false);
    setOpenUserMenu(false);
    navigate("/home");
  };

  const dashboardLinks = [
    // The path comparison will check if the current URL starts with '/detect' or '/planner'
    { name: 'Detection', path: '/detect', icon: ChartBarIcon },
    { name: 'Planner', path: '/planner', icon: SunIcon }, 
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <h1
            onClick={() => navigate("/home")}
            className="text-2xl font-extrabold text-indigo-700 cursor-pointer"
          >
            Vita<span className="text-pink-600">Health</span>
          </h1>

          {/* Desktop Links & User Menu (Hidden on small screens) */}
          {/* *** DESKTOP CONTAINER: Added h-full to align links correctly *** */}
          <div className="hidden sm:flex sm:space-x-8 items-center text-gray-700 font-medium h-full">
            {/* Main Navigation */}
            {dashboardLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                // *** DESKTOP ACTIVE STYLING: Added h-full and flex items-center ***
                className={`hover:text-indigo-600 px-3 py-2 transition duration-150 ease-in-out h-full flex items-center
                            ${location.pathname.startsWith(item.path) 
                              ? "text-indigo-600 border-b-2 border-indigo-600" // Active state with underline
                              : "text-gray-700 hover:border-b-2 hover:border-gray-200"}` // Hover effect
                            }
              >
                {item.name}
              </button>
            ))}

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition duration-150"
              >
                <UserCircleIcon className="w-6 h-6 text-indigo-600" />
                <span className="hidden lg:inline text-sm font-semibold text-indigo-700">{user?.firstname || "User"}</span>
              </button>

              {openUserMenu && (
                <div 
                  className="absolute right-0 mt-2 py-1 bg-white border border-gray-100 rounded-lg shadow-xl w-40 origin-top-right animate-fade-in-down"
                  onMouseLeave={() => setOpenUserMenu(false)}
                >
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpenUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-t mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button (Visible only on small screens) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={openMenu}
            >
              <span className="sr-only">Open main menu</span>
              {openMenu ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Collapsible Section */}
      <div className={`sm:hidden transition-all duration-300 ease-out ${openMenu ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
           {/* User Info (at the top of the mobile menu) */}
          <div className="flex items-center space-x-3 px-3 py-2 border-b mb-2">
            <UserCircleIcon className="w-7 h-7 text-indigo-600" />
            <span className="text-lg font-bold text-indigo-700">{user?.firstname || "User"}</span>
          </div>
          
          {/* Main Mobile Navigation */}
          {dashboardLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => { navigate(item.path); setOpenMenu(false); }}
              // MOBILE STYLING: Using bg-indigo-50/text-indigo-700 for highlighting instead of border
              className={`flex items-center w-full text-left text-base font-medium rounded-md px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700
                         ${location.pathname.startsWith(item.path) ? "bg-indigo-50 text-indigo-700" : ""}`}
            >
               <item.icon className="w-5 h-5 mr-3" />
               {item.name}
            </button>
          ))}
          
          {/* Action Links */}
          <button
            onClick={() => { navigate("/profile"); setOpenMenu(false); }}
            className="flex items-center w-full text-left text-base font-medium rounded-md px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <UserCircleIcon className="w-5 h-5 mr-3" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left text-base font-medium rounded-md px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 mt-2"
          >
            <XMarkIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
