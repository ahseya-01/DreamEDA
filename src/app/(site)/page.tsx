import Footer from '@/components/Footer';
import EbookCard from '@/components/EbookCard';
import { DEMO_PRODUCTS } from '@/lib/demo';
import logoImage from '@/components/logo.jpeg';

export default function SiteHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Main Container */}
      <main className="flex-grow w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        {/* First Box: Learn Smarter Live Better */}
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full">
          <span className="inline-block bg-sky-200 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Digital Publishing Store
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

        {/* Second Box: Brand Trust, About & All Detailed Sections in Grid Style */}
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 w-full max-w-full flex flex-col gap-8">
          
          {/* Top part: Intro + Logo side-by-side */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Side: Brand Name & Introduction */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                DreamEDA
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                DreamEDA is a premier digital publishing platform where we deliver high-quality eBooks, quick guides, and creative printables for modern readers and learners. Our goal is to make your learning experience fast, affordable, and accessible. Every digital product is available as an instant secure download so you can start reading immediately without any wait. We place quality and user satisfaction above everything else.
              </p>
            </div>

            {/* Right Side: Larger Logo Box */}
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

          {/* Divider Line inside the box */}
          <hr className="border-sky-200 my-2" />

          {/* 1. Our Motive Section */}
          <div>
            <h3 className="text-xl font-bold text-sky-900 mb-4">Our Motive</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Instant Accessibility:</strong> Providing digital resources to learners instantly without any wait.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Affordable Learning:</strong> Delivering high-quality content matching every student's budget.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Skill Enhancement:</strong> Crafting practical guides and printables to boost daily productivity.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Continuous Growth:</strong> Constantly updating content on trending topics for modern learners.
              </div>
              <div className="bg-white/60 sm:col-span-2 md:col-span-2 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">User Trust:</strong> Building a reliable digital brand with customer satisfaction as top priority.
              </div>
            </div>
          </div>

          {/* 2. What We Deliver Section */}
          <div className="pt-4 border-t border-sky-200">
            <h3 className="text-xl font-bold text-sky-900 mb-4">What We Deliver</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Curated eBooks:</strong> Premium digital books on science, productivity, and self-growth.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Quick-Learning Guides:</strong> Concise guides delivering maximum knowledge in minimal time.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Creative Printables:</strong> Engaging coloring books and activity sheets for kids and adults.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Instant Downloads:</strong> Secure PDF download links available immediately after payment.
              </div>
              <div className="bg-white/60 sm:col-span-2 md:col-span-2 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Print-Ready Formats:</strong> Formats optimized for easy home printing or digital reading.
              </div>
            </div>
          </div>

          {/* 3. Why Choose DreamEDA Section */}
          <div className="pt-4 border-t border-sky-200">
            <h3 className="text-xl font-bold text-sky-900 mb-4">Why Choose DreamEDA</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Verified Quality:</strong> Thorough quality checks conducted for every digital product.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Time Saving:</strong> Straight-to-the-point content designed to save your precious time.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Zero Hidden Charges:</strong> Transparent pricing with what you see being what you get.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Easy Navigation:</strong> User-friendly platform to easily find and download materials.
              </div>
              <div className="bg-white/60 sm:col-span-2 md:col-span-2 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Dedicated Support:</strong> Fast and effective resolution for all customer queries.
              </div>
            </div>
          </div>

          {/* 4. Smart Learning Benefits Section */}
          <div className="pt-4 border-t border-sky-200">
            <h3 className="text-xl font-bold text-sky-900 mb-4">Smart Learning Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Self-Paced Reading:</strong> Read anytime, anywhere on your smartphone or laptop.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Pocket Friendly:</strong> Gain superior knowledge at minimal cost without expensive books.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Interactive Design:</strong> Printables and guides that make learning fun and engaging.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Instant Application:</strong> Easily apply learned concepts directly into your daily life.
              </div>
              <div className="bg-white/60 sm:col-span-2 md:col-span-2 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Clarity & Focus:</strong> Clean, structured content delivered without any distractions.
              </div>
            </div>
          </div>

          {/* 5. Our Future Vision Section */}
          <div className="pt-4 border-t border-sky-200">
            <h3 className="text-xl font-bold text-sky-900 mb-4">Our Future Vision</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Wide Catalog:</strong> Expanding with new categories and subjects in the future.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Community Building:</strong> Creating a strong digital community of learners and readers.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Interactive Tools:</strong> Introducing new digital features to make learning easier.
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Exclusive Discounts:</strong> Special offers and perks for regular customers and subscribers.
              </div>
              <div className="bg-white/60 sm:col-span-2 md:col-span-2 p-4 rounded-2xl border border-sky-100">
                <strong className="text-gray-900 block mb-1">Global Reach:</strong> Reaching and empowering learners across the globe with our digital products.
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
