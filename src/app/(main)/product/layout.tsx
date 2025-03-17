import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const CollectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-[#f9f5ef]">
        <Navbar/>
        <div className="min-h-[90svh]">
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default CollectionLayout;