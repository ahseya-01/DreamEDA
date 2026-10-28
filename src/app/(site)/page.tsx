import Footer from '@/components/Footer';
import EbookCard from '@/components/EbookCard';
import { DEMO_PRODUCTS } from '@/lib/demo';

export default function SiteHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Main Hero Section */}
      <main className="flex-grow">
        <section className="py-12 px-4 max-w-4xl mx-auto">
          {/* Box containing the 4 lines with Sky Blue background */}
          <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
            {/* 1. Top Badge */}
            <span className="inline-block bg-sky-200 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Digital Publishing Store
            </span>
            
            {/* 2. Main Bold Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 text-gray-900">
              Learn Smarter Live Better
            </h1>

            {/* 3. Subtitle in a slightly different style */}
            <p className="mt-3 text-xl sm:text-2xl font-semibold text-gray-700 italic">
              Exclusive eBooks & Printables
            </p>

            {/* 4. Description right below the subtitle */}
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of high-quality digital reads, quality texts, and educational printables.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
