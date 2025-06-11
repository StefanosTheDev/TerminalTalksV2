import Hero from './components/public/Hero';
import NavBar from './components/public/NavBar';
import Footer from './components/public/Footer';
import Trusted from './components/public/Trusted';
import HowItWorks from './components/public/HowItWorks';
import FAQ from './components/public/FAQ';
export default function Home() {
  return (
    <div className="main-app">
      {/* Main Home Page Render */}
      <NavBar /> {/* Step 1 : Navbar */}
      <Hero /> {/* Step 2: Render A Hero Page */}
      <Trusted />
      <HowItWorks />
      {/* <FAQ /> */}
      <Footer />
    </div>
  );
}
