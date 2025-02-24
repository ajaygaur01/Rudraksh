import Image from "next/image";
import HomeBtn from "@/components/HomeBtn";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-[#f9f5ef]">
      {/* Image Section - Fixed height on mobile, full height on desktop */}
      <div className="relative hidden md:block w-full md:w-[34%] h-40 md:h-screen overflow-hidden">
        <Image
          src="/images/banners/yog.png"
          alt="hero"
          fill
          className="object-center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40 z-10" />
      </div>

      {/* Children Section - Fixed the typo in 'selection:' class */}
      <div className="relative w-full md:w-[66%] md:h-screen p-4 md:p-0 overflow-auto">
        <HomeBtn />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;