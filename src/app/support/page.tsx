'use client';

import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12 px-6 flex flex-col items-center">

      <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-sm text-gray-800">

        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Customer Support
        </h1>

        <p className="text-sm text-gray-500 mb-8 text-center">
          We're here to help you!
        </p>

        <div className="space-y-8 text-left leading-relaxed text-sm md:text-base">

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-sky-600 mb-3">
              How Can We Help You?
            </h2>
            <p>
              Welcome to DreamEDA Support. If you have any questions or
              experience any issues while using our website or digital
              products, we're happy to assist you.
            </p>
          </section>

          {/* Download Issues */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1. eBook Download Issues
            </h2>
            <p>
              If you have completed your purchase but are unable to access
              or download your eBook, please contact our support team with
              your order details.
            </p>
          </section>

          {/* Payment Issues */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Payment Issues
            </h2>
            <p>
              If your payment has been deducted but your order is not
              confirmed, please contact us with your transaction details
              so we can look into the issue.
            </p>
          </section>

          {/* PDF Issues */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3. PDF File Issues
            </h2>
            <p>
              If your purchased PDF file is corrupted, damaged or cannot
              be opened, please reach out to us. We will review the issue
              and assist you.
            </p>
          </section>

          {/* Account Issues */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              4. Account & Login Issues
            </h2>
            <p>
              If you experience difficulties accessing your account or
              using any website feature, contact us for assistance.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-3">
              Contact Our Support Team
            </h2>

            <p className="mb-4">
              For assistance, you can reach us through the following
              channels:
            </p>

            <p className="mb-3">
              <strong>Email: </strong>
              <a
                href="mailto:dreamedalibrary@gmail.com"
                className="text-sky-600 hover:underline break-all"
              >
                dreamedalibrary@gmail.com
              </a>
            </p>

            <p>
              <strong>Instagram: </strong>
              <a
                href="https://www.instagram.com/dreameda_library/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                @dreameda_library
              </a>
            </p>
          </section>

          {/* Important Note */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              5. Before Contacting Us
            </h2>
            <p>
              To help us resolve your issue faster, please include your
              registered email address, order details and a brief
              description of the problem. Please do not share your
              password or sensitive payment information.
            </p>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">

          <Link
            href="/"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition text-sm w-full sm:w-auto text-center shadow-sm"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}