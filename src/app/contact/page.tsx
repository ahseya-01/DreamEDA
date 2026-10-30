import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-sky-100 rounded-3xl p-8 max-w-lg w-full text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="space-y-4 mb-8 text-left bg-sky-50/50 p-6 rounded-2xl">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</p>
            <a href="mailto:dreamedalibrary@gmail.com" className="text-lg font-medium text-blue-600 hover:underline">
              dreamedalibrary@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instagram ID</p>
            <a href="https://instagram.com/dreameda_library" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-pink-600 hover:underline">
              @dreameda_library
            </a>
          </div>
        </div>

        <Link 
          href="/" 
          className="inline-block w-full bg-sky-100 hover:bg-sky-200 text-gray-900 font-semibold py-3 rounded-xl transition text-center"
        >
          Home
        </Link>
      </div>
    </div>
  );
}