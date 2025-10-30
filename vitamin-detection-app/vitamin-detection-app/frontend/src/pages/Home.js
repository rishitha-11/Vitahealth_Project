import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import feature1 from "../assets/images.jpeg";
import feature2 from "../assets/feature2.jpeg";
import feature3 from "../assets/feature3.jpg";
import background from "../assets/background.jpg";

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "A balanced diet is the best medicine.",
    "Your health is your greatest wealth — nourish it.",
    "Detect deficiencies early, live stronger longer.",
    "Vitamin balance fuels a vibrant life.",
    "Prevention begins with awareness.",
    "Small nutrients make a big difference.",
    "Stay healthy, stay energetic — every vitamin counts.",
    "AI-powered health insights for a better you.",
    "Good nutrition is the foundation of good health.",
    "Know your body, feed it right.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const features = [
    {
      title: "Vitamin Detection",
      desc: "AI-powered vitamin deficiency detection using your health inputs.",
      img: feature1,
    },
    {
      title: "Disease Insights",
      desc: "Get insights into possible health risks and early prevention tips.",
      img: feature2,
    },
    {
      title: "Diet Planner",
      desc: "Personalized diet plans based on your detected deficiencies.",
      img: feature3,
    },
  ];

  const faqs = [
    {
      q: "How does VitaHealth detect deficiencies?",
      a: "Our AI analyzes your health inputs, diet, and lifestyle to detect potential vitamin deficiencies.",
    },
    {
      q: "Is my data safe?",
      a: "Absolutely. All user data is stored securely in our system and never shared with third parties.",
    },
    {
      q: "Can I get a personalized diet plan?",
      a: "Yes! Based on detected deficiencies, our AI generates a diet plan tailored just for you.",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto" style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      {/* Hero Section */}
      <div
        className="w-full h-[60vh] md:h-[80vh] bg-cover bg-center relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        <motion.div
          className="text-center px-6 py-8 rounded-2xl bg-white/85 backdrop-blur-sm z-10 max-w-4xl shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-3 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Detect Vitamin Deficiencies with{" "}
              <span className="text-pink-600">VitaHealth</span>
            </h1>
            <p className="text-md md:text-xl text-gray-700 max-w-2xl mx-auto">
              Understand your health better with AI-powered deficiency detection
              and personalized nutrition insights.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="my-6"
          >
            <Link to="/chatbot">
              <button className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105">
                Talk to VitaBot Now! 💬
              </button>
            </Link>
          </motion.div>
          
          <motion.p
            key={quoteIndex}
            className="text-lg md:text-xl text-gray-800 italic font-medium mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            "{quotes[quoteIndex]}"
          </motion.p>
        </motion.div>
      </div>

      {/* Features Section - Improved grid alignment and card structure */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {features.map((f, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center cursor-pointer h-full"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 + index * 0.3 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex-shrink-0 mb-6">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <h3 className="text-xl font-bold text-indigo-700 mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-indigo-50 py-20 px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose <span className="text-pink-500">VitaHealth</span>?
        </motion.h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p>
              We use AI to provide accurate detection of vitamin deficiencies and personalized recommendations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Personalized Diet Plans</h3>
            <p>
              Get diet plans tailored to your health needs and deficiencies to maintain optimal nutrition.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Easy & Accessible</h3>
            <p>
              VitaHealth is web-based, easy to use, and provides quick insights without expensive tests.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p>
              All user data is handled securely with privacy as a priority.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + idx * 0.2 }}
            >
              <h3 className="font-semibold text-lg text-indigo-700 mb-2">
                {faq.q}
              </h3>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-indigo-100 text-gray-700 py-4 px-6 border-t border-indigo-200">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VitaHealth. All rights reserved. | Disclaimer: This tool provides general health insights and is not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
