import Image from "next/image";
import HomeBtn from "@/components/HomeBtn";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-[#f9f5ef]">
      {/* Image Section - Fixed height on mobile, full height on desktop */}
      <div className="relative w-full md:w-[34%] h-40 md:h-screen overflow-hidden">
        <Image
          src="/images/banners/yog.png"
          alt="hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40 z-10" />
        {/* Commented section preserved
        <div
          className={`${merriweather.className} absolute z-20 top-[10%] md:top-[20%] text-neutral-200 text-3xl md:text-6xl xl:text-6xl 2xl:text-7xl font-bold text-left pl-[4%] leading-[2.5rem] md:leading-[6rem] 2xl:leading-[6rem]`}
        >
          Let <br /> Rudraksha <br /> Guide Your <br /> Path to <br /> Peace.
        </div> */}
      </div>

      {/* Children Section - Fixed the typo in 'selection:' class */}
      <div className="relative w-full md:w-[66%] h-[calc(100vh-10rem)] md:h-screen p-4 md:p-0 overflow-auto">
        <HomeBtn />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;