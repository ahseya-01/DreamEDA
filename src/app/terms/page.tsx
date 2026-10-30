'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12 px-6 flex flex-col items-center">
      <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-sm text-gray-800">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Last updated: October 2026</p>

        <div className="space-y-6 text-left leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              Welcome to DreamEDA. By accessing or using our platform, purchasing eBooks, or downloading digital printables, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Digital Products & Intellectual Property</h2>
            <p>
              All eBooks, PDFs, and educational printables available on DreamEDA are the intellectual property of the platform. They are protected by copyright laws. Purchasing a digital product grants you a single, non-exclusive, non-transferable license for personal, non-commercial use only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Restrictions on Use</h2>
            <p>
              You agree not to copy, reproduce, distribute, resell, upload, or share any purchased eBooks or digital content from DreamEDA on public forums, social media, or file-sharing websites. Any unauthorized distribution will result in immediate termination of access and potential legal action.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Refund & Cancellation Policy</h2>
            <p>
              Due to the digital nature of our products (eBooks and downloadable files), all sales are final. Once a file has been downloaded or accessed from DreamEDA, we do not offer refunds or exchanges, except in cases of technical corruption of the file provided by us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. User Accounts</h2>
            <p>
              If you create an account on DreamEDA, you are responsible for maintaining the confidentiality of your account details and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms & Conditions at any time. Continued use of DreamEDA after any changes constitutes your acceptance of the new terms.
            </p>
          </section>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link 
            href="/" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition text-sm w-full sm:w-auto text-center"
          >
            ← Back to Home
          </Link>
          
          {/* Ye button click hone par home page par jayega aur agar aap chahein toh wahan modal open kar sakte hain */}
          <button 
            onClick={() => {
              window.location.href = '/?openLogin=true';
            }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition text-sm w-full sm:w-auto text-center shadow-sm cursor-pointer"
          >
            Go to Login Window →
          </button>
        </div>

      </div>
    </div>
  );
}