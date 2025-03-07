import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const CollectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-[#f9f5ef]">
        <Navbar/>
        {children}
        <Footer/>
    </div>
  );
};

export default CollectionLayout;