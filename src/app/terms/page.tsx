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
              All eBooks, PDFs, and educational printables available on DreamEDA are protected by applicable copyright and intellectual property laws. Purchasing a digital product grants you a single, non-exclusive, non-transferable license for personal, non-commercial use only. Ownership and copyright remain with DreamEDA or the respective rights holders.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Restrictions on Use</h2>
            <p>
              You agree not to copy, reproduce, distribute, resell, upload, or share any purchased eBooks or digital content from DreamEDA on public forums, social media, or file-sharing websites without prior written permission from the respective rights holder. Unauthorized use may result in appropriate action under applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Refund & Cancellation Policy</h2>
            <p>
              Due to the digital nature of our products (eBooks and downloadable files), refunds are generally not available. Since the PDF file is delivered immediately after a successful purchase, we are unable to accept refund requests once the purchase is completed. However, if a purchased file is technically corrupted or defective, please contact our support team for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. User Accounts</h2>
            <p>
              If you create an account on DreamEDA, you are responsible for maintaining the confidentiality of your account details and for activities carried out through your account. Please notify us if you become aware of any unauthorized access or suspicious activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Product Information & Availability</h2>
            <p>
              We make reasonable efforts to provide accurate descriptions, previews, and details of our digital products. However, product availability, content, and features may change from time to time. Please review the product description carefully before completing your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Payments & Digital Delivery</h2>
            <p>
              Purchases must be completed through the payment methods made available on DreamEDA. Digital products will be provided through the delivery or access method specified at the time of purchase. If a payment is successful but the purchased product is not received, please contact our support team with your transaction reference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Acceptable Use of the Platform</h2>
            <p>
              You agree to use DreamEDA lawfully and responsibly. You must not attempt to disrupt the website, interfere with its security, misuse its features, or engage in activities that may harm the platform or other users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Third-Party Services & Links</h2>
            <p>
              DreamEDA may use third-party services for payments, website functionality, or other platform operations. Such services may be governed by their own terms and privacy policies. We encourage users to review the applicable terms of those services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Website Availability & Technical Issues</h2>
            <p>
              We aim to keep DreamEDA accessible and functioning properly. However, temporary interruptions, maintenance, technical errors, or service disruptions may occasionally occur. We will make reasonable efforts to address such issues.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms & Conditions at any time. Any updates will be published on this page with a revised date. Continued use of DreamEDA after changes take effect will be subject to the updated terms, in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">12. Contact Us</h2>
            <p>
              If you have any questions, concerns, or complaints regarding these Terms & Conditions or our digital products, please contact us through our official email address:
            </p>
            <p className="mt-2">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:dreamedalibrary@gmail.com"
                className="text-sky-600 hover:underline"
              >
                dreamedalibrary@gmail.com
              </a>
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