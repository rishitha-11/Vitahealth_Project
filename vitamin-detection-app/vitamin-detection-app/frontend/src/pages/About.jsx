import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, BoltIcon, HeartIcon } from '@heroicons/react/24/outline';

const Pillar = ({ icon: Icon, title, description, color }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-transform hover:scale-[1.03] duration-300">
        <Icon className={`w-10 h-10 text-${color} mb-4`} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default function About() {
  const pillars = [
    {
        icon: BoltIcon,
        title: "AI-Powered Accuracy",
        description: "We use machine learning models trained on extensive datasets to provide quick, reliable, non-invasive deficiency predictions.",
        color: 'indigo-600'
    },
    {
        icon: AcademicCapIcon,
        title: "Evidence-Based Planning",
        description: "Our nutritional planners are designed by dietitians and aligned with current medical recommendations for deficiency reversal.",
        color: 'pink-600'
    },
    {
        icon: HeartIcon,
        title: "Health Accessibility",
        description: "Our mission is to make preliminary nutritional health screening affordable and available to everyone, everywhere.",
        color: 'green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Hero Section */}
        <motion.div
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center mb-12 border-b-4 border-pink-600"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                About <span className="text-pink-600">VitaHealth</span>
            </h1>
            <p className="text-xl text-gray-600">
                Revolutionizing nutritional health through non-invasive AI detection and personalized guidance.
            </p>
        </motion.div>

        {/* Mission Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b pb-2">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
                Millions of people suffer from undiagnosed vitamin and mineral deficiencies, often leading to chronic health issues. VitaHealth was founded to bridge the gap between subtle physical symptoms and essential nutritional awareness. We aim to empower users with **immediate, private, and actionable insights** that guide them toward optimal health through better dietary choices.
            </p>
        </div>

        {/* Core Pillars Section */}
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Our Core Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillars.map((pillar, index) => (
                    <Pillar key={index} {...pillar} />
                ))}
            </div>
        </div>
        
      </div>
    </div>
  );
}
