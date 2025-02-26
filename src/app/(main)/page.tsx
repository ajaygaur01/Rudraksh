
import Caraousel from "@/components/Caraousel";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RudrakshaCollection from "@/components/RudrakhsaCollection";
import RudrakshaShowCase from "@/components/RudraShowCase";

export default function Home() {
  
  return (
    <div className="min-h-screen w-full">
      <Navbar/>
      <Caraousel/>
      <RudrakshaCollection/>
      <RudrakshaShowCase/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
