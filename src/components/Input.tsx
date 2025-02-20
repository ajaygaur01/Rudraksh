import React from 'react'

const Input = ({
    searchVal,
    setSearchVal,
    className
} : NavInputProps) => {

    
  return (
    <div className={`relative w-[350px] max-w-md flex align-baseline ${className}`}>
    <input 
        type="text"
        placeholder="Search for the products"
        className="w-full px-4 py-2 pr-10 text-gray-600 placeholder-gray-500 border border-gray-600 outline-none focus:ring-0 focus:border-gray-600 rounded"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
    />
    <div className="absolute inset-y-0 right-3 flex items-center">
        <svg 
        className="w-6 h-6 text-gray-800" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </div>
</div>
  )
}

export default Input