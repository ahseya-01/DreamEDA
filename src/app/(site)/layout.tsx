import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">Skip to content</a><Header /><main id="main">{children}</main><Footer /></>);
}
