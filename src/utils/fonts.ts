import { Geist, Geist_Mono,Merriweather, Poppins} from "next/font/google";


export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
export const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
});

export const popping = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
});