import Hero from '@/app/_components/public/Hero';
import NavBar from '@/app/_components/public/NavBar';
import Footer from '@/app/_components/public/Footer';
import Trusted from '@/app/_components/public/Trusted';
import HowItWorks from '@/app/_components/public/HowItWorks';
import FAQ from '@/app/_components/public/FAQ';
export default function Home() {
  return (
    <div className="main-app">
      {/* Main Home Page Render */}
      <NavBar /> {/* Step 1 : Navbar */}
      <Hero /> {/* Step 2: Render A Hero Page */}
      <Trusted />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
