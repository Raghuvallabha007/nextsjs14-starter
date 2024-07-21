"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-2xl font-bold" href="/">
              MyLogo
            </Link>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" href="/">
              Home
            </Link>
            <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700" href="/dropdown">
              Dropdown
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" href="/">
              Home
            </Link>
            <Link className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" href="/dropdown">
              Dropdown
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
