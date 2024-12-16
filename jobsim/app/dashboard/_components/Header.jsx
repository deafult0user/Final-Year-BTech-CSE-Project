"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname();
  const { user, isSignedIn, isLoaded } = useUser(); // Using `useUser` from Clerk

  useEffect(() => {
    console.log(isSignedIn);  // Optional: For debugging
  }, [isSignedIn]);

  // When Clerk is still loading the authentication state, return null or a loading indicator.
  if (!isLoaded) {
    return null; // You can show a simple loading spinner here if needed.
  }

  return (
    <div className="flex p-6 items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Image
          src={'/image.png'}
          width={200}
          height={90}
          alt="JobSim"
          priority
          className="transform transition-transform hover:scale-105 duration-300"
        />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-lg font-medium text-white tracking-wide">
        <li className={`transition-all duration-300 cursor-pointer ${path === '/' ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400'} transform hover:scale-105`}>
          <Link href={'../'}>Home</Link>
        </li>
        <li className={`transition-all duration-300 cursor-pointer ${path === '/dashboard' ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400'} transform hover:scale-105`}>
          <Link href={'/dashboard'}>Dashboard</Link>
        </li>
        <li className={`transition-all duration-300 cursor-pointer ${path === '/upgrade' ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400'} transform hover:scale-105`}>
          <Link href={'/upgrade'}>Upgrade</Link>
        </li>
        <li className={`transition-all duration-300 cursor-pointer ${path === '/how' ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400'} transform hover:scale-105`}>
          <Link href={'/'}>How it works?</Link>
        </li>
      </ul>

      {/* User Button or Login Button */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton
            className="transform transition-transform hover:scale-110 hover:rotate-3 duration-300 rounded-full border-2 border-indigo-500 p-2"
          />
        ) : (
          <Link href={'/dashboard'}>
            <Button className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl duration-300">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
