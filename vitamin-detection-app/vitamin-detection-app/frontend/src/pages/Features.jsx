import React from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, ChartBarIcon, SunIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, color, linkTo }) => (
  <motion.div
    className="bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col items-start hover:shadow-2xl transition-all duration-300 border-t-4 border-b-4 border-transparent hover:border-indigo-400"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className={`p-3 rounded-full bg-indigo-50 mb-4`}>
      <Icon className={`w-8 h-8 text-${color}`} />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{description}</p>
    <Link 
        to={linkTo} 
        className={`text-${color} font-semibold flex items-center hover:underline`}
    >
        Get Started &rarr;
    </Link>
  </motion.div>
);

export default function Features() {
  const featuresList = [
    {
      icon: BeakerIcon,
      title: "AI Deficiency Detection",
      description: "Upload an image of your skin or tongue, or input symptoms. Our proprietary AI model analyzes indicators to instantly suggest potential vitamin and mineral deficiencies.",
      color: 'pink-600',
      linkTo: '/detect'
    },
    {
      icon: ChartBarIcon,
      title: "Personalized 7-Day Planner",
      description: "Receive a tailored, actionable meal plan based on your detected deficiency. Track your progress daily and get back on the path to optimal nutrition.",
      color: 'indigo-600',
      linkTo: '/planner/VitaminA' // Placeholder link
    },
    {
      icon: SunIcon,
      title: "Nutritional Insights & Facts",
      description: "Access easy-to-understand information about each vitamin and mineral, including natural food sources and the health consequences of severe deficiency.",
      color: 'green-600',
      linkTo: '/about'
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Health History",
      description: "Your detection and progress history is securely saved, allowing you to monitor your health trends over time and manage recurring nutritional goals.",
      color: 'yellow-600',
      linkTo: '/profile'
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-pink-600 text-lg font-semibold uppercase tracking-wider">Core Services</p>
          <h1 className="text-5xl font-extrabold text-gray-800 mt-2 mb-4">
            Powerful Health Tools at Your Fingertips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            VitaHealth uses cutting-edge technology to give you actionable insights into your nutritional status.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
