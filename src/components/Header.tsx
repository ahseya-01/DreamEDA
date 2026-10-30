"use client";
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart icon click handler (Dispatches cart modal event to page.tsx)
  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-cart-modal'));
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-24 sm:w-36 md:w-48 pl-7 pr-2 py-1 text-xs sm:text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-black"
            />
            <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded hover:bg-gray-100 text-gray-700 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link
              href="/cart"
              onClick={handleCartClick}
              className="p-1 rounded hover:bg-gray-100 text-gray-700 relative cursor-pointer"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 w-52 bg-white rounded-xl shadow-lg border py-2 z-50">
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-login-modal'));
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Login
            </button>
            <Link href="/all-ebooks" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Ebooks</Link>
            <button onClick={() => { const el = document.getElementById("About"); if(el) el.scrollIntoView({ behavior: "smooth" }); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</button>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</Link>
            <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terms & Conditions</Link>
            <Link href="/help" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</Link>
            <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Privacy Policy</Link>
          </div>
        )}

      </div>
    </header>
  );
}

