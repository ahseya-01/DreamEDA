import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-gray-600 mb-6">
          Last updated: October 2026
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>DreamEDA</strong>. We respect your privacy
              and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store,
              process, and protect your personal information when you
              visit our website, create an account, purchase eBooks,
              or use our digital products and services.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Information We Collect
            </h2>
            <p>
              Depending on how you use our platform, we may collect
              the following categories of information:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Age or Date of Birth, if requested</li>
              <li>Account login and authentication information</li>
              <li>Order history and purchased digital products</li>
              <li>Cart and transaction-related information</li>
              <li>Information provided through customer support requests</li>
            </ul>

            <p className="mt-2">
              We collect only the information reasonably necessary
              for the purposes explained in this policy.
            </p>
          </section>

          {/* 3. Automatically Collected Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3. Automatically Collected Information
            </h2>
            <p>
              When you visit our website, certain technical information
              may be collected depending on the technologies and services
              enabled on our platform.
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device and operating system information</li>
              <li>Website usage and diagnostic information</li>
              <li>Log and security-related information</li>
            </ul>
          </section>

          {/* 4. How We Use Your Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              4. How We Use Your Information
            </h2>
            <p>
              We use collected information for legitimate and disclosed
              business purposes, including:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Creating and managing user accounts.</li>
              <li>Providing login and authentication services.</li>
              <li>Managing shopping carts and purchase records.</li>
              <li>Processing orders and delivering purchased eBooks.</li>
              <li>Providing customer support and resolving issues.</li>
              <li>Sending important account and transaction notifications.</li>
              <li>Maintaining website functionality and security.</li>
              <li>Preventing fraudulent or unauthorized activities.</li>
              <li>Complying with applicable legal obligations.</li>
            </ul>
          </section>

          {/* 5. Consent and Lawful Processing */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              5. Consent and Lawful Processing
            </h2>
            <p>
              We aim to process personal information in a lawful,
              transparent, and purpose-specific manner.
              Where consent is required, we will provide appropriate
              information about the purpose of collection and obtain
              consent through suitable mechanisms.
            </p>

            <p className="mt-2">
              Users may withdraw consent where processing is based
              on consent, subject to applicable laws and any lawful
              consequences of such withdrawal.
            </p>

            <p className="mt-2">
              Withdrawal of consent does not affect the lawfulness
              of processing carried out before the withdrawal.
            </p>
          </section>

          {/* 6. Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              6. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website may use cookies and similar technologies
              to support essential website functionality, maintain
              user sessions, improve performance, and understand
              website usage where applicable.
            </p>

            <p className="mt-2">
              You may manage or restrict cookies through your browser
              settings. Disabling certain cookies may affect some
              website features.
            </p>

            <p className="mt-2">
              Where required, we will obtain consent before using
              non-essential cookies or tracking technologies.
            </p>
          </section>

          {/* 7. Payment Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              7. Payment Information
            </h2>
            <p>
              Payments for digital products may be processed through
              third-party payment service providers.
            </p>

            <p className="mt-2">
              Depending on the payment method, transaction references,
              payment status, order details, and related information
              may be received or maintained for order management,
              customer support, and legal or accounting purposes.
            </p>

            <p className="mt-2">
              Payment providers may independently process payment
              information under their own privacy policies and
              security practices.
            </p>
          </section>

          {/* 8. Data Storage and Database */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              8. Data Storage and Database
            </h2>
            <p>
              DreamEDA uses Supabase for database and related
              backend services as part of its website infrastructure.
              Personal information may be stored and processed
              through these services depending on the features used.
            </p>

            <p className="mt-2">
              Access to stored information should be restricted
              to authorized systems and personnel who require
              access for legitimate operational purposes.
            </p>
          </section>

          {/* 9. Data Security */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              9. Data Security
            </h2>
            <p>
              We take reasonable technical and organizational measures
              to protect personal information against unauthorized
              access, disclosure, alteration, loss, or misuse.
            </p>

            <p className="mt-2">
              Depending on the services implemented, security measures
              may include access controls, authentication mechanisms,
              database permissions, secure communication, and
              appropriate data protection practices.
            </p>

            <p className="mt-2">
              However, no method of electronic transmission or storage
              can be guaranteed to be completely secure.
            </p>
          </section>

          {/* 10. Data Sharing and Disclosure */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              10. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell personal information to third parties
              for their independent marketing purposes.
            </p>

            <p className="mt-2">
              We may share necessary information with:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Database and hosting service providers.</li>
              <li>Payment processing service providers.</li>
              <li>Email and communication service providers.</li>
              <li>Technical support and security service providers.</li>
              <li>Government authorities where legally required.</li>
            </ul>

            <p className="mt-2">
              Such sharing will be limited to what is reasonably
              necessary for the relevant purpose and subject
              to applicable legal requirements.
            </p>
          </section>

          {/* 11. Third-Party Services */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              11. Third-Party Services
            </h2>
            <p>
              Our platform may integrate with third-party services
              to support authentication, database storage, payments,
              hosting, communication, and other website functions.
            </p>

            <p className="mt-2">
              These third-party providers may process information
              according to their own privacy policies and terms.
              We encourage users to review the applicable policies
              of such providers.
            </p>

            <p className="mt-2">
              DreamEDA is not responsible for the independent privacy
              practices of external websites or services, subject
              to applicable law.
            </p>
          </section>

          {/* 12. Data Retention */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              12. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as
              reasonably necessary to fulfil the purposes for which
              it was collected, provide our services, resolve disputes,
              maintain transaction records, and comply with applicable
              legal obligations.
            </p>

            <p className="mt-2">
              When information is no longer required, we will take
              appropriate steps to delete or anonymize it, subject
              to applicable retention requirements.
            </p>
          </section>

          {/* 13. Your Privacy Rights */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              13. Your Privacy Rights
            </h2>
            <p>
              Subject to applicable laws, users may have the right to:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Request information about their personal data.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request completion of incomplete information.</li>
              <li>Request deletion of personal information where applicable.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Raise privacy-related complaints.</li>
              <li>Exercise other rights available under applicable law.</li>
            </ul>

            <p className="mt-2">
              Requests may be subject to identity verification,
              legal requirements, and applicable exceptions.
            </p>
          </section>

          {/* 14. Account Deletion */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              14. Account Deletion
            </h2>
            <p>
              Users may request the deletion of their DreamEDA
              accounts through the available account settings
              or by contacting our support team.
            </p>

            <p className="mt-2">
              Upon receiving a valid request, we will process it
              in accordance with applicable laws and our data
              retention obligations.
            </p>

            <p className="mt-2">
              Certain transaction records or information may need
              to be retained where required by law or necessary
              for legitimate legal purposes.
            </p>
          </section>

          {/* 15. Data Breach Notification */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              15. Data Breach Notification
            </h2>
            <p>
              In the event of a personal data breach, we will take
              appropriate steps to investigate, contain, and address
              the incident.
            </p>

            <p className="mt-2">
              We will provide notifications to affected individuals
              and relevant authorities in accordance with applicable
              legal requirements and prescribed timelines.
            </p>
          </section>

          {/* 16. Children's Privacy */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              16. Children's Privacy
            </h2>
            <p>
              We recognize the importance of protecting children's
              personal information.
            </p>

            <p className="mt-2">
              Where applicable laws require parental or guardian
              consent for processing a child's personal information,
              we will implement appropriate measures to obtain
              and verify such consent before processing.
            </p>

            <p className="mt-2">
              We will handle children's personal information
              in accordance with applicable Indian data protection
              requirements.
            </p>
          </section>

          {/* 17. International Data Transfers */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              17. International Data Transfers
            </h2>
            <p>
              Certain third-party service providers used by our
              platform may process or store information in
              locations outside India.
            </p>

            <p className="mt-2">
              Where personal information is transferred or processed
              internationally, we will follow applicable Indian
              data protection laws and relevant government
              restrictions or requirements.
            </p>
          </section>

          {/* 18. Changes to This Privacy Policy */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              18. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time
              to reflect changes in our services, business practices,
              technology, or applicable legal requirements.
            </p>

            <p className="mt-2">
              Updated versions will be published on this page
              with a revised update date. Where required, we will
              provide appropriate notice of significant changes.
            </p>
          </section>

          {/* 19. Contact and Grievance Redressal */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              19. Contact and Grievance Redressal
            </h2>
            <p>
              If you have any questions, concerns, or complaints
              regarding this Privacy Policy or the handling
              of your personal information, you may contact
              DreamEDA through our Help & Feedback or Contact Us
              sections.
            </p>

            <p className="mt-2">
              For formal privacy or consumer-related grievances,
              please use the contact details provided in our
              Grievance Redressal section.
            </p>

            <p className="mt-2">
              We will acknowledge and address complaints within
              the timelines prescribed under applicable laws.
            </p>
          </section>

        </div>

        {/* Bottom Home Button matching original style */}
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