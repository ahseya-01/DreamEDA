'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import EbookCard from '@/components/EbookCard';
import { DEMO_PRODUCTS } from '@/lib/demo';
import logoImage from '@/components/logo.jpeg';
import RecentEbooks from '@/components/RecenteBooks';

export default function SiteHomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'general' | 'cart'>('general');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openLogin') === 'true') {
      setModalType('general');
      setIsModalOpen(true);
    }

    const handleOpenLogin = () => {
      setModalType('general');
      setIsModalOpen(true);
    };

    const handleOpenCart = () => {
      setModalType('cart');
      setIsModalOpen(true);
    };

    window.addEventListener('open-login-modal', handleOpenLogin);
    window.addEventListener('open-cart-modal', handleOpenCart);

    return () => {
      window.removeEventListener('open-login-modal', handleOpenLogin);
      window.removeEventListener('open-cart-modal', handleOpenCart);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">
      
      <main className="flex-grow w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <span className="inline-block bg-sky-200 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            The Digital Library
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Learn Smarter Live Better
          </h1>

          <p className="mt-3 text-xl sm:text-2xl font-semibold text-gray-700">
            Exclusive eBooks & Printables
          </p>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-4xl">
            Explore our curated collection of high-quality digital reads, quick-learning guides, and creative printables designed to elevate your daily productivity.
          </p>
        </div>

        <RecentEbooks />

        <div id="About" className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                DreamEDA
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                DreamEDA is a premier digital publishing platform where we deliver high-quality eBooks, quick guides, and creative printables for modern readers and learners. Our goal is to make your learning experience fast, affordable, and accessible. Every digital product is available as an instant secure download so you can start reading immediately without any wait. We place quality and user satisfaction above everything else.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-44 h-44 bg-white border border-sky-200 rounded-3xl flex items-center justify-center shadow-sm p-2 overflow-hidden">
                <img 
                  src={logoImage.src} 
                  alt="DreamEDA Logo" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Motive Section */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Motive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Instant Accessibility</h3>
              <p className="text-sm text-gray-600">Providing digital resources to learners instantly without any wait.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Affordable Learning</h3>
              <p className="text-sm text-gray-600">Delivering high-quality content matching every student's budget.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Skill Enhancement</h3>
              <p className="text-sm text-gray-600">Crafting practical guides and printables to boost data productivity.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Continuous Growth</h3>
              <p className="text-sm text-gray-600">Constantly updating content on trending topics for modern learners.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">User Trust</h3>
              <p className="text-sm text-gray-600">Building a reliable digital brand with customer satisfaction as top priority.</p>
            </div>
          </div>
        </div>

        {/* What We Deliver Section */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">What We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Curated eBooks</h3>
              <p className="text-sm text-gray-600">In-depth digital books on science, productivity, and self-growth.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Quick Learning Guides</h3>
              <p className="text-sm text-gray-600">Concise guides delivering maximum knowledge in minimal time.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Creative Printables</h3>
              <p className="text-sm text-gray-600">Engaging inspiring books and activity sheets for kids and adults.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Instant Downloads</h3>
              <p className="text-sm text-gray-600">Get immediate file access right after secure checkout.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Print Ready Formats</h3>
              <p className="text-sm text-gray-600">High-resolution files optimized for both digital reading and home printing.</p>
            </div>
          </div>
        </div>

        {/* Why Choose DreamEDA Section */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Why Choose DreamEDA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Verified Quality</h3>
              <p className="text-sm text-gray-600">Thorough quality checks conducted for every single product.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Time Saving</h3>
              <p className="text-sm text-gray-600">Straight to the point content designed to save valuable time.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Zero Hidden Charges</h3>
              <p className="text-sm text-gray-600">Transparent pricing with what you see being what you get.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Easy Navigation</h3>
              <p className="text-sm text-gray-600">Clean website layout to help you find less apps with zero friction.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Dedicated Support</h3>
              <p className="text-sm text-gray-600">Quick assistance for all verified customer queries.</p>
            </div>
          </div>
        </div>

        {/* Smart Learning Benefits Section */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Smart Learning Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Self-Paced Reading</h3>
              <p className="text-sm text-gray-600">Read anytime, anywhere on your smartphone or laptop.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Pocket Friendly</h3>
              <p className="text-sm text-gray-600">Gain superior knowledge at marginal cost without breaking your bank.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Interactive Design</h3>
              <p className="text-sm text-gray-600">Printable and guides that make learning fun and engaging.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Instant Application</h3>
              <p className="text-sm text-gray-600">Easily apply learned concepts directly into your daily life.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Clarity & Focus</h3>
              <p className="text-sm text-gray-600">Clean, structured content delivered without any distractions.</p>
            </div>
          </div>
        </div>

        {/* Our Future Vision Section */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Future Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Wide Catalog</h3>
              <p className="text-sm text-gray-600">Expanding with new categories and subjects in the future.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Community Building</h3>
              <p className="text-sm text-gray-600">Creating a strong digital community of learners and readers.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Interactive Tools</h3>
              <p className="text-sm text-gray-600">Introducing new digital features to make learning easier faster.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Exclusive Discounts</h3>
              <p className="text-sm text-gray-600">Special offers and perks for regular customers and subscribers.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-1">Global Reach</h3>
              <p className="text-sm text-gray-600">Reaching and empowering learners across the globe with our digital products.</p>
            </div>
          </div>
        </div>

      </main>

      {/* POPUP MODAL (Exact design matching your image) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
              {modalType === 'cart' ? 'Login Required' : 'Welcome to DreamEDA'}
            </h2>
            <p className="text-xs text-gray-500 mb-6 text-center">
              {modalType === 'cart' 
                ? 'Please login to access to cart.' 
                : 'Please enter your details to login to your account.'}
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Success!'); setIsModalOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                <input type="email" placeholder="Enter your email address" className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Age *</label>
                <input type="number" placeholder="Enter your age" className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>

              {/* T&C Checkbox - Compulsory */}
              <div className="flex items-start space-x-2 pt-2">
                <input type="checkbox" id="modal-terms" className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer" required />
                <label htmlFor="modal-terms" className="text-xs text-gray-600">
                  I accept all <a href="/terms" target="_blank" className="text-sky-600 underline font-medium">Terms & Conditions</a> *
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition text-sm shadow-sm cursor-pointer">
                  {modalType === 'cart' ? 'Submit' : 'Login'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition text-sm cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
