import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-sky-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-600">
            DreamEDA
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Digital Product Refund Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last Updated: 31 October 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="leading-7 text-slate-700">
            At DreamEDA, we aim to provide a smooth, transparent and
            reliable experience when purchasing our digital products.
            This Refund Policy explains the conditions under which
            refunds, payment corrections and technical assistance
            may be provided for purchases made through our website.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Please read this policy carefully before completing
            your purchase.
          </p>
        </section>

        {/* 1 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            1. Nature of Digital Products
          </h2>

          <p className="leading-7 text-slate-700">
            DreamEDA primarily offers digital products, including
            eBooks and downloadable PDF files. These products are
            delivered electronically rather than through physical
            shipping.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Once a digital product has been successfully delivered
            or made accessible to a customer, it cannot be physically
            returned.
          </p>
        </section>

        {/* 2 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            2. General Refund Policy
          </h2>

          <p className="leading-7 text-slate-700">
            Due to the digital nature of our products, purchases
            are generally non-refundable once the product has been
            successfully delivered or accessed.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Refunds are generally not provided for the following
            reasons:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Change of mind after purchasing a digital product.</li>
            <li>Accidental purchase by the customer.</li>
            <li>Purchasing the wrong product by mistake.</li>
            <li>Not using or reading the purchased eBook.</li>
            <li>Personal dissatisfaction where the product has been
              accurately described and delivered.</li>
            <li>Incompatibility caused by the customer's device,
              software or reading application.</li>
          </ul>

          <p className="mt-3 leading-7 text-slate-700">
            However, this general policy does not remove any
            consumer rights or remedies available under applicable
            Indian law.
          </p>
        </section>

        {/* 3 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            3. Eligible Refund Situations
          </h2>

          <p className="leading-7 text-slate-700">
            We will review refund requests in genuine situations,
            including:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              Payment has been successfully deducted, but the
              customer has not received the purchased product.
            </li>
            <li>
              The same order has been charged more than once.
            </li>
            <li>
              The delivered PDF or digital file is corrupted,
              incomplete or technically unusable.
            </li>
            <li>
              The customer receives a product that is materially
              different from the product description.
            </li>
            <li>
              A technical issue on our side prevents the customer
              from accessing the purchased product.
            </li>
          </ul>

          <p className="mt-3 leading-7 text-slate-700">
            Depending on the situation, we may first attempt to
            resolve the issue by providing a working download link,
            correcting the file or delivering the correct product.
            If the issue cannot be reasonably resolved, an eligible
            refund may be considered.
          </p>
        </section>

        {/* 4 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            4. Failed or Duplicate Payments
          </h2>

          <p className="leading-7 text-slate-700">
            If an amount is deducted from your account but the order
            is not successfully completed, please contact our
            support team with the relevant payment details.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            In case of duplicate payments for the same purchase,
            the additional verified payment will be reviewed for
            correction or refund.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Refund processing will depend on payment verification,
            the payment provider and applicable banking or payment
            system requirements.
          </p>
        </section>

        {/* 5 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            5. Download and Access Issues
          </h2>

          <p className="leading-7 text-slate-700">
            If you experience difficulty downloading, opening or
            accessing your purchased eBook, please contact us before
            submitting a refund request.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Our support team will try to help resolve the problem
            by checking the download link, file format or delivery
            issue.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            If the problem is caused by DreamEDA and cannot be
            resolved within a reasonable time, we will review the
            request for an appropriate remedy, including a refund
            where applicable.
          </p>
        </section>

        {/* 6 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            6. How to Request a Refund
          </h2>

          <p className="leading-7 text-slate-700">
            To request a refund or report a payment or delivery
            issue, contact us using the email address below:
          </p>

          <div className="mt-4 rounded-xl bg-sky-50 p-5">
            <p className="font-semibold text-slate-900">
              Email Support
            </p>

            <a
              href="mailto:dreamedalibrary@gmail.com"
              className="mt-2 inline-block break-all font-medium text-sky-700 hover:underline"
            >
              dreamedalibrary@gmail.com
            </a>
          </div>

          <p className="mt-4 leading-7 text-slate-700">
            Please include the following information:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Your name.</li>
            <li>Order or transaction ID, if available.</li>
            <li>Product name.</li>
            <li>Date of purchase.</li>
            <li>Description of the issue.</li>
            <li>Relevant payment or error screenshot, if available.</li>
          </ul>

          <p className="mt-3 leading-7 text-slate-700">
            Please do not share your password, OTP, full card
            number, CVV or other confidential banking credentials.
          </p>
        </section>

        {/* 7 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            7. Refund Review and Processing
          </h2>

          <p className="leading-7 text-slate-700">
            We will review refund requests based on the order
            details, payment records and the nature of the reported
            issue.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Where a refund is approved, it will generally be
            processed through the original payment method,
            subject to applicable payment system requirements.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            The time taken for the amount to appear in your account
            may depend on your bank, card issuer or payment service
            provider.
          </p>
        </section>

        {/* 8 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            8. Order Cancellation
          </h2>

          <p className="leading-7 text-slate-700">
            If you wish to cancel an order before the digital
            product has been delivered or access has been provided,
            please contact us as soon as possible.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Cancellation requests will be reviewed according to
            the status of the order and applicable consumer
            protection requirements.
          </p>
        </section>

        {/* 9 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            9. Misuse and Fraud Prevention
          </h2>

          <p className="leading-7 text-slate-700">
            DreamEDA may investigate suspicious, duplicate or
            fraudulent refund requests using relevant order and
            transaction records.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Any action taken will be subject to applicable laws.
            A genuine consumer complaint or legally available
            refund claim will not be rejected merely because a
            customer has contacted support.
          </p>
        </section>

        {/* 10 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            10. Customer Consumer Rights
          </h2>

          <p className="leading-7 text-slate-700">
            Nothing in this policy is intended to exclude,
            restrict or override any rights or remedies available
            to consumers under the Consumer Protection Act, 2019,
            the Consumer Protection (E-Commerce) Rules, 2020,
            or other applicable Indian laws.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            If you are not satisfied with the resolution of your
            complaint, you may seek assistance through the
            appropriate consumer grievance mechanisms available
            under Indian law.
          </p>
        </section>

        {/* 11 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            11. Customer Grievance Support
          </h2>

          <p className="leading-7 text-slate-700">
            For questions, complaints, payment disputes or
            refund-related concerns, customers can contact
            DreamEDA through:
          </p>

          <p className="mt-3 text-slate-700">
            <strong>Email:</strong>{' '}
            dreamedalibrary@gmail.com
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Consumer complaints will be acknowledged and handled
            in accordance with applicable grievance redressal
            requirements.
          </p>
        </section>

        {/* 12 */}
        <section className="mb-7">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            12. Changes to This Policy
          </h2>

          <p className="leading-7 text-slate-700">
            DreamEDA may update this Refund Policy when necessary
            to reflect changes in our services, business practices
            or applicable laws and regulations.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Any updated version will be published on this page
            along with its revised date.
          </p>
        </section>

        {/* 13 */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            13. Contact Information
          </h2>

          <p className="leading-7 text-slate-700">
            For any questions regarding this policy or your
            purchase, please contact:
          </p>

          <div className="mt-4 rounded-xl bg-sky-50 p-5">
            <p className="font-bold text-slate-900">DreamEDA</p>

            <p className="mt-2 text-slate-700">
              Email: dreamedalibrary@gmail.com
            </p>

            <p className="mt-2 text-slate-700">
              Instagram: @dreameda_library
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="mb-5 text-sm text-slate-500">
            Thank you for choosing DreamEDA.
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}