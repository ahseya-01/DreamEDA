"use client";
import { useState } from 'react';

export default function RecentEbooks() {
  const [selectedEbook, setSelectedEbook] = useState<any>(null);

  // Yeh placeholder data hai, baad mein tum yahan apni real ebooks add kar sakogi
  const ebooks = [
    { id: 1, title: "Ebook Title 1", price: "₹299", desc: "Short description about what this ebook contains, key learning outcomes, and highlights." },
    { id: 2, title: "Ebook Title 2", price: "₹349", desc: "Short description about what this ebook contains, key learning outcomes, and highlights." },
    { id: 3, title: "Ebook Title 3", price: "₹199", desc: "Short description about what this ebook contains, key learning outcomes, and highlights." },
    { id: 4, title: "Ebook Title 4", price: "₹499", desc: "Short description about what this ebook contains, key learning outcomes, and highlights." },
  ];

  return (
    <section className="w-full py-8">
      {/* Bada Rectangular Box (Light Blue Shade) */}
      <div className="bg-[#f0f4f8] rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Recently Uploaded Ebooks</h2>

        {/* 4 White Boxes Grid (Desktop par 4 ek row mein, Mobile par 2x2 grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ebooks.map((ebook) => (
            <div 
              key={ebook.id}
              onClick={() => setSelectedEbook(ebook)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
            >
              {/* Ebook Cover Placeholder */}
              <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-xs">
                Cover Page
              </div>
              {/* Ebook Name */}
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{ebook.title}</h3>
              <span className="text-xs text-blue-600 font-medium mt-1">{ebook.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Window / Modal (Jab user kisi box par click karega) */}
      {selectedEbook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setSelectedEbook(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2 h-52 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                Cover Photo
              </div>
              <div className="w-full sm:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900">{selectedEbook.title}</h3>
                <p className="text-lg font-semibold text-blue-600 my-2">{selectedEbook.price}</p>
                <div className="flex space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-1">Description & Features:</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedEbook.desc}</p>
              
              <button 
                onClick={() => alert("Added to cart functionality will be connected next!")}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}