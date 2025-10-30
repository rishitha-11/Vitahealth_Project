import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Assumes you install @heroicons/react

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' }, // Add more actual routes here
    { name: 'About', path: '/about' },
  ];

  const authItems = [
    { name: 'Login', path: '/login', isPrimary: true },
    { name: 'Register', path: '/register', isPrimary: false },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold text-indigo-700">
              Vita<span className="text-pink-600">Health</span>
            </h1>
          </Link>

          {/* Desktop Links (Hidden on small screens) */}
          <div className="hidden sm:flex sm:space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-600 hover:text-indigo-700 font-medium px-3 py-2 transition duration-150 ease-in-out 
                           ${location.pathname === item.path ? "text-indigo-600 border-b-2 border-indigo-600" : ""}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop Auth Buttons */}
            {authItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-semibold rounded-lg ml-4 transition duration-150 ease-in-out
                            ${item.isPrimary 
                               ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
                               : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                            }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (Visible only on small screens) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Collapsible Section */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={`block text-base font-medium rounded-md px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700
                         ${location.pathname === item.path ? "bg-indigo-50 text-indigo-700" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Auth Links */}
          {authItems.map((item) => (
             <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className={`block w-full text-center text-sm font-semibold rounded-lg px-3 py-2 mt-2
                            ${item.isPrimary 
                               ? 'text-white bg-pink-500 hover:bg-pink-600' // Use pink for strong mobile CTA
                               : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                            }`}
              >
                {item.name}
              </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}