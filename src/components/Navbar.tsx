"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlignJustify } from 'lucide-react';
import Input from './Input';
import { ButtonNavLinks, TopNavIcon } from '@/utils/constants';
import SelectCurrency from './SelectCurrency';


const NavIcon = ({Icon, url} : IconWithUrl) => {
    return (
        <Link href={url} className='px-2 py-2 inline-flex align-baseline hover:bg-[#ede9e0] rounded cursor-pointer'>
            <Icon size={28} strokeWidth={1} color='#0A0A0A'/>
        </Link>
    )
}

const Navbar = () => {

  const [searchVal,setSearchVal] = useState<string>('');
  const [isScrolled] = useState<boolean>(false);

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className='flex-between'>
        <div className='px-8 py-3 inline-flex align-baseline gap-6'>
            <AlignJustify size={40} strokeWidth={1.2} color='#1f2937'/>
            <Image
                src="/images/logos/Logo.svg" // Replace with your logo path
                alt="Nepa Rudraksha"
                width={140}
                height={40}
                className="h-10 w-auto px-10"
            />
        </div>
        <div className='px-8 py-3 inline-flex flex-center gap-6'>
            <Input searchVal={searchVal} setSearchVal={setSearchVal} className='mr-2'/>
            {
                TopNavIcon.map((icon, index) => (
                    <NavIcon key={index} Icon={icon.Icon} url={icon.url}/>
                ))
            }

            <SelectCurrency/>
        </div>
      </div>
      <div className='w-full flex justify-center items-center py-4 border-b border-gray-100'>
  {ButtonNavLinks.map((link, index) => (
    <div key={index} className='relative px-5 md:px-8'>
      <span 
        className={`text-base font-medium cursor-pointer ${
          link.title === 'whatever' 
            ? 'text-amber-600' 
            : link.title === 'whatever'
              ? 'text-amber-400 hover:text-amber-600'
              : 'text-gray-700 hover:text-amber-600'
        } transition-colors duration-200`}
      >
        {link.title}
      </span>
      {link.title === 'Shivaratri' && (
        <span className='absolute -top-2 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded text-center' style={{ fontSize: '10px' }}>
          Special
        </span>
      )}
    </div>
  ))}
</div>
    </nav>
  );
};

export default Navbar;