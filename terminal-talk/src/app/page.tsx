import Hero from '@/app/_components/public/Hero';
import NavBar from '@/app/_components/public/NavBar';
// import Footer from '@/app/_components/public/Foooter';
import Trusted from '@/app/_components/public/Trusted';
import HowItWorks from '@/app/_components/public/HowItWorks';
import FAQ from '@/app/_components/public/FAQ';
import Header from './_components/public/NavBar/NavBar2';
import Hero2 from './_components/public/Hero/Hero2';
import ExperienceLectures from './_components/public/ExperienceLectures/ExperienceLectures';
import PowerfulFeatures from './_components/public/PowerfulFeatures/PowerfulFeatures';
import Pricing from './_components/public/Pricing/Pricing';
import Footer1 from './_components/public/Foooter/Footer';
export default function Home() {
  return (
    <div className="main-app">
      {/* Main Home Page Render */}
      <Header />
      <Hero2 />
      <ExperienceLectures />
      <PowerfulFeatures />
      <Pricing />
      <Footer1 />
    </div>
  );
}
