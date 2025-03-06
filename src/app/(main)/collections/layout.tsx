import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Caraousel from "@/components/Caraousel";


const CollectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-[#f9f5ef]">
        <Navbar/>
        <Caraousel/>
        {children}
        <Footer/>
    </div>
  );
};

export default CollectionLayout;