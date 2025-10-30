import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChatbotPage component.
 * Ensures the embedded chatbot is fully visible without clipping the corners.
 */
export default function ChatbotPage() {
  const chatbotUrl = '/chatbot.html'; 

  return (
    <motion.div
      // MODIFICATION 1: Change p-6 to p-4 (to allow the iframe more space)
      // and ensure h-full is maintained.
      className="w-full h-full p-4 flex flex-col items-center bg-gray-50"
      style={{ paddingTop: '0' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-2 mt-4">
        Chat with VitaBot 🤖
      </h2>
      <p className="text-gray-600 mb-4">
        Ask any questions about vitamins, health, or deficiencies.
      </p>
      
      {/* The Iframe to embed the HTML file */}
      <iframe
        src={chatbotUrl}
        title="VitaBot Chatbot"
        // MODIFICATION 2: Change max-w-4xl to max-w-5xl (or remove it entirely) to 
        // give the iframe more horizontal breathing room inside the container.
        // Also, add 'mt-2' to push the frame down slightly.
        className="w-full max-w-5xl mt-2 border-2 border-indigo-200 rounded-lg shadow-xl overflow-hidden"
        style={{ height: '85vh', border: 'none' }} 
      >
        Your browser does not support iframes. Please open the chatbot directly.
      </iframe>
    </motion.div>
  );
}