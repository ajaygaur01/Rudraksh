// components/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#10281E] text-white mt-[350px] overflow-hidden">
  {/* Top features section */}
  <div className="w-full py-8 border-b border-[#1d3d2f]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      <div className="flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <h3 className="text-base font-medium uppercase mb-1">WORLDWIDE DELIVERY</h3>
        <p className="text-sm text-gray-400">Shipping for all countries</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m18 0l-9 3-9-3" />
        </svg>
        <h3 className="text-base font-medium uppercase mb-1">ART OF GIVING</h3>
        <p className="text-sm text-gray-400">Delivered in an iconic packaging</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 className="text-base font-medium uppercase mb-1">PAYMENTS</h3>
        <p className="text-sm text-gray-400">Safe payments</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <h3 className="text-base font-medium uppercase mb-1">GIFT MESSAGE</h3>
        <p className="text-sm text-gray-400">Free gift message</p>
      </div>
    </div>
  </div>
  
  {/* Main footer content */}
  <div className="w-full py-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 px-4">
      {/* Column 1 */}
      <div>
        <h3 className="text-amber-500 font-medium mb-6">EXCLUSIVE SERVICES</h3>
        <ul className="space-y-4">
          <li><Link href="/refund-policy" className="text-white hover:text-amber-400 transition-colors">Refund policy</Link></li>
          <li><Link href="/privacy-policy" className="text-white hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
          <li><Link href="/exclusive-collections" className="text-white hover:text-amber-400 transition-colors">Our Exclusive Collections</Link></li>
          <li><Link href="/book-consultation" className="text-white hover:text-amber-400 transition-colors">Book a Consultation</Link></li>
          <li><Link href="/subscription" className="text-white hover:text-amber-400 transition-colors">Pooja Subscription</Link></li>
        </ul>
      </div>
      
      {/* Column 2 */}
      <div>
        <h3 className="text-amber-500 font-medium mb-6">MAY WE HELP YOU?</h3>
        <ul className="space-y-4">
          <li><Link href="/help-contact" className="text-white hover:text-amber-400 transition-colors">Help and Contact</Link></li>
          <li><Link href="/track-order" className="text-white hover:text-amber-400 transition-colors">Track Order</Link></li>
          <li><Link href="/shipping-info" className="text-white hover:text-amber-400 transition-colors">Shipping Information</Link></li>
          <li><Link href="/payment-info" className="text-white hover:text-amber-400 transition-colors">Payment Information</Link></li>
          <li><Link href="/faq" className="text-white hover:text-amber-400 transition-colors">FAQ</Link></li>
        </ul>
      </div>
      
      {/* Column 3 */}
      <div>
        <h3 className="text-amber-500 font-medium mb-6">OUR BRANDS</h3>
        <ul className="space-y-4">
          <li><Link href="/why-nepa" className="text-white hover:text-amber-400 transition-colors">Why Nepa Rudraksha?</Link></li>
          <li><Link href="/certification" className="text-white hover:text-amber-400 transition-colors">Certification and Guarantee</Link></li>
          <li><Link href="/review" className="text-white hover:text-amber-400 transition-colors">Write us a Review</Link></li>
          <li><Link href="/terms" className="text-white hover:text-amber-400 transition-colors">Terms of Service</Link></li>
        </ul>
      </div>
      
      {/* Column 4 */}
      <div>
        <h3 className="text-amber-500 font-medium mb-6">FIND US ON</h3>
        <ul className="space-y-4">
          <li>
            <Link href="https://facebook.com" className="text-white hover:text-amber-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Facebook
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com" className="text-white hover:text-amber-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com" className="text-white hover:text-amber-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </Link>
          </li>
          <li>
            <Link href="https://youtube.com" className="text-white hover:text-amber-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Youtube
            </Link>
          </li>
          <li>
            <Link href="https://whatsapp.com" className="text-white hover:text-amber-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Whatsapp
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Column 5 - Newsletter */}
      <div>
        <h3 className="text-amber-500 font-medium mb-6">NEWSLETTER SIGNUP</h3>
        <p className="text-white mb-4">Sign up for our e-mail and be the first who know our special offers!</p>
        
        <div className="flex mb-6">
          <input 
            type="email" 
            placeholder="Enter your e-mail" 
            className="flex-grow px-3 py-2 bg-white text-gray-800 outline-none"
          />
          <button className="bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600 transition-colors">
            GET!
          </button>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;