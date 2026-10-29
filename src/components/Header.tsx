"use client";
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo'; // Tumhara original logo component wapas import kiya gaya hai

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', age: '', email: '' });

  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.age && formData.email) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      alert("Login Successful!");
    } else {
      alert("Please fill in all details.");
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        
        {/* Original Logo Component */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Section: Search Box, Menu & Cart */}
        <div className="flex items-center space-x-3">
          
          {/* Search Box (Compact, slightly away from company name) */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-24 sm:w-36 md:w-48 pl-7 pr-2 py-1 text-xs sm:text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Top Right Stack: Menu on top, Cart right below it */}
          <div className="flex flex-col items-end space-y-1">
            
            {/* Menu Icon (3 horizontal bars, no text) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded hover:bg-gray-100 text-gray-750 focus:outline-none"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Cart Icon (No text, only icon) right below Menu */}
            <Link 
              href="/cart" 
              onClick={handleCartClick}
              className="p-1 rounded hover:bg-gray-100 text-gray-750 relative"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Options */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <Link href="/all-ebooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All eBooks</Link>
          <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">About</Link>
          <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Contact Us</Link>
          <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help and Feedback</Link>
          <Link href="/privacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Privacy Policy</Link>
        </div>
      )}

      {/* Login Modal for Cart */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-sm text-gray-500 mb-4">Please enter your details to open your cart.</p>
            
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="number"
                placeholder="Age"
                required
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              
              <div className="flex space-x-3 pt-2">
                <button type="submit" className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium">Login</button>
                <button type="button" onClick={() => setShowLoginModal(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
