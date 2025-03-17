"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AlignJustify } from "lucide-react"
import Input from "./Input"
import { ButtonNavLinks, TopNavIcon } from "@/utils/constants"
import SelectCurrency from "./SelectCurrency"
import Drawer from "./Drawer"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"

type IconWithUrl = {
  Icon: React.ComponentType<{ size: number; strokeWidth: number; color: string }>
  url: string
}

const NavIcon = ({ Icon, url }: IconWithUrl) => {
  return (
    <Link href={url} className="px-2 py-2 inline-flex align-baseline hover:bg-[#ede9e0] rounded cursor-pointer">
      <Icon size={28} strokeWidth={1} color="#0A0A0A" />
    </Link>
  )
}

const Navbar = () => {
  const [searchVal, setSearchVal] = useState<string>("")
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter();

  const handleRedirect = () => {
    const token = Cookies.get("auth_token");
    if (token) {
      router.push("/user");
    } else {
      router.push("/register");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingDown(true)
        setIsOpen(false)
      } else {
        setIsScrollingDown(false) // Show top section on scroll up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      {/* Drawer Component */}
      <Drawer isOpen={drawerOpen || false} onClose={() => setDrawerOpen(false)} />

      {/* Top Section (Hides on scroll down, reappears on scroll up) */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 bg-white ${
          isScrollingDown ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ height: "60px" }} // Adjust based on your design
      >
        <div className="flex-between h-full shadow-lg md:shadow-none">
          <div className="md:px-8 py-3 inline-flex align-baseline gap-6">
            <button onClick={toggleDrawer} className="hidden md:block focus:outline-none" aria-label="Toggle menu">
              <AlignJustify size={40} strokeWidth={1.2} color="#1f2937" />
            </button>
            <Link href="/">
              <Image
                src="/images/logos/Logo.svg"
                alt="Rishi Rudraksha"
                width={140}
                height={40}
                className="h-10 w-auto px-10"
              />
            </Link>
          </div>
          <div className="hidden md:inline-flex px-8 py-3 flex-center gap-6">
            <Input searchVal={searchVal} setSearchVal={setSearchVal} className="mr-2" />
            {TopNavIcon.map((icon, index) => (
              index === 2 ? 
              (<button key={index} onClick={handleRedirect} className="px-2 py-2 inline-flex align-baseline hover:bg-[#ede9e0] rounded cursor-pointer">
              <icon.Icon size={28} strokeWidth={1} color="#0A0A0A" />
            </button>)
              : 
              (<NavIcon key={index} Icon={icon.Icon} url={icon.url} />)
            ))}
            <SelectCurrency isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className="block md:hidden">
            <button onClick={toggleDrawer} className="mx-5 focus:outline-none" aria-label="Toggle menu">
              <AlignJustify size={40} strokeWidth={1.2} color="#1f2937" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fixed Nav Links (Positioned Below the Top Section) */}
      <div
        className={`w-full hidden md:block ${
          isScrollingDown ? "top-0" : "top-[60px]"
        } fixed left-0 py-4 border-b border-gray-100 bg-white z-40 shadow-md transition-transform duration-300`}
      >
        <div
          className="
        md:grid grid-flow-col grid-cols-auto-fit min-[100px] justify-center gap-2 min-[800px]:gap-6 min-[1000px]:gap-12 px-5 md:px-8
      "
        >
          {ButtonNavLinks.map((link, index) => (
            <Link key={index} href={link.url}>
            <div key={index} className="relative text-center">
              <span
                className={`text-base font-medium cursor-pointer ${
                  link.title === "whatever"
                    ? "text-amber-600"
                    : link.title === "whatever"
                      ? "text-amber-400 hover:text-amber-600"
                      : "text-gray-700 hover:text-amber-600"
                } transition-colors duration-200`}
              >
                {link.title}
              </span>
              {link.title === "Shivaratri" && (
                <span
                  className="absolute -top-2 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded text-center"
                  style={{ fontSize: "10px" }}
                >
                  Special
                </span>
              )}
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Space to prevent content overlap */}
      <div className="md:h-[85px]"></div>
    </>
  )
}

export default Navbar

