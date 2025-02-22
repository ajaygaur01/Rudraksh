
import Caraousel from "@/components/Caraousel";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  
  return (
    <div className="min-h-screen w-full">
      <Navbar/>
      <Caraousel/>
      <Footer/>
    </div>
  );
}
