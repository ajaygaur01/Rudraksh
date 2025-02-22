import { merriweather } from "@/utils/fonts";
import Image from "next/image";
import HomeBtn from "@/components/HomeBtn";


const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-[#f9f5ef]">
      {/* Image Section */}
      <div className="relative w-full md:w-[34%] h-40 md:h-screen overflow-hidden">
        <Image
          src="/images/banners/Yog-Banner.avif"
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="w-full h-full bg-black absolute z-10 opacity-40" />
        <div
          className={`${merriweather.className} absolute z-20 top-[10%] md:top-[20%] text-neutral-200 text-3xl md:text-6xl xl:text-6xl 2xl:text-7xl  font-bold text-left pl-[4%] leading-[2.5rem] md:leading-[6rem] 2xl:leading-[6rem]`}
        >
          Let <br /> Rudraksha <br /> Guide Your <br /> Path to <br /> Peace.
        </div>
      </div>

      {/* Children Section */}
      <div className="relative selection:w-full md:w-[66%] h-auto md:h-screen p-4 md:p-0">
        <HomeBtn/>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;