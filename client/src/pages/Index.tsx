import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground"> 
      <Navbar />
<HeroSection/>
      <Footer />
      
    </div>

      
  );
}
