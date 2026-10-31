'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpFeedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'General Feedback',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `DreamEDA Support - ${form.category}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:dreamedalibrary@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Help & Feedback
        </h1>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Welcome to DreamEDA Support! We are here to help you with
          your questions, technical issues, and feedback. Choose
          the section below that best matches your needs.
        </p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">

          {/* Frequently Asked Questions */}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              1. Frequently Asked Questions
            </h2>

            <div className="space-y-3">

              <details className="bg-sky-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  How can I purchase an eBook?
                </summary>
                <p className="mt-3">
                  Browse our available digital products, select
                  the eBook you want, and follow the checkout
                  instructions to complete your purchase.
                </p>
              </details>

              <details className="bg-sky-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  How can I access my purchased eBook?
                </summary>
                <p className="mt-3">
                  Follow the download or access instructions
                  provided after your purchase. If you experience
                  any difficulty, contact our support team.
                </p>
              </details>

              <details className="bg-sky-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  What if my payment is successful but I do not
                  receive my eBook?
                </summary>
                <p className="mt-3">
                  Please contact us with your registered email
                  address and transaction reference. Never share
                  your password, OTP, or complete card details.
                </p>
              </details>

              <details className="bg-sky-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  What if I have trouble logging into my account?
                </summary>
                <p className="mt-3">
                  Contact our support team and describe the
                  problem you are experiencing.
                </p>
              </details>

              <details className="bg-sky-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  Can I request a refund?
                </summary>
                <p className="mt-3">
  We’re sorry, but refunds are generally not available for our eBooks. Since these are digital products and the PDF file is delivered immediately after a successful purchase, we are unable to accept refund requests once the purchase is completed. However, if your purchased PDF file is technically corrupted or defective, please contact our support team for assistance. We truly appreciate your understanding and support.
</p>
              </details>

            </div>
          </section>

          {/* Contact Support */}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              2. Contact Support
            </h2>

            <p className="mb-4">
              Need personal assistance? You can reach us through
              the following official support channels.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">

              <a
                href="mailto:dreamedalibrary@gmail.com"
                className="block text-center bg-sky-100 hover:bg-sky-200 text-gray-900 font-semibold p-4 rounded-xl transition"
              >
                ✉️ Email Support
                <span className="block text-xs font-normal mt-1">
                  dreamedalibrary@gmail.com
                </span>
              </a>

              <a
                href="https://www.instagram.com/dreameda_library/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-sky-100 hover:bg-sky-200 text-gray-900 font-semibold p-4 rounded-xl transition"
              >
                📷 Instagram Support
                <span className="block text-xs font-normal mt-1">
                  @dreameda_library
                </span>
              </a>

            </div>
          </section>

          {/* Report a Problem */}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              3. Report a Problem
            </h2>

            <p>
              If you encounter a technical issue while using
              DreamEDA, please describe it using the feedback
              form below so we can look into it.
            </p>
          </section>

          {/* Feedback Form */}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              4. Send Us Your Feedback
            </h2>

            <p className="mb-5">
              Your feedback helps us improve DreamEDA and
              provide a better experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block font-semibold mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Select a Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-200 bg-white"
                >
                  <option>General Feedback</option>
                  <option>Payment Issue</option>
                  <option>Download Issue</option>
                  <option>Account / Login Issue</option>
                  <option>Website Technical Issue</option>
                  <option>Product Related Query</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Your Message
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Describe your question or feedback..."
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-200 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-100 hover:bg-sky-200 text-gray-900 font-semibold py-3 rounded-xl transition"
              >
                Submit Feedback
              </button>

              <p className="text-xs text-gray-500">
                Submitting this form will open your email application
                with your message prepared for DreamEDA Support.
                You will need to send the email to complete submission.
              </p>

            </form>
          </section>

          {/* Additional Help */}

          <section className="bg-sky-50 p-5 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Still Need Help?
            </h2>

            <p>
              If your question has not been answered, please contact
              us directly through our official email or Instagram
              support channel.
            </p>
          </section>

        </div>

        {/* Home Button */}

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
