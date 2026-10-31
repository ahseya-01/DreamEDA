import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <p className="text-sm text-gray-600 mb-6">
          Last updated: October 2026
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>DreamEDA</strong>. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your details when you visit our website and use our platform for digital resources and educational content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>
              When you register, log in, or interact with our platform, we may collect personal details such as:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Age</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <p>
              The information we collect is used strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To provide and maintain your user account access and cart functionality.</li>
              <li>To deliver purchased eBooks, study materials, and digital printables.</li>
              <li>To communicate important updates, support messages, or policy changes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard security measures (including secure database storage via Supabase) to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted directly on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Contact Us</h2>
            <p>
              If you have any questions or suggestions regarding our Privacy Policy, please feel free to reach out to us through our Help & Feedback or Contact Us sections.
            </p>
          </section>
        </div>

        {/* Bottom Home Button matching Contact Us style */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <Link 
            href="/" 
            className="inline-block w-full bg-sky-100 hover:bg-sky-200 text-gray-900 font-semibold py-3 rounded-xl transition text-center"
          >
            Home
          </Link>
        </div>

      </div>
    </div>
  );
}