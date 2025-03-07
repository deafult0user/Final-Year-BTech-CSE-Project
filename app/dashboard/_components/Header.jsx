// "use client"
// import { Button } from '@/components/ui/button'
// import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { Menu, X } from 'lucide-react'

// function Header() {
//   const path = usePathname();
//   const { user, isSignedIn, isLoaded } = useUser(); // Using `useUser` from Clerk
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     console.log(isSignedIn);  // Optional: For debugging
//   }, [isSignedIn]);

//   // When Clerk is still loading the authentication state, return null or a loading indicator.
//   if (!isLoaded) {
//     return null; // You can show a simple loading spinner here if needed.
//   }

//   return (
//     <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 shadow-xl relative">
//       <div className="flex items-center space-x-4">
//         <Image
//           src={'/image.png'}
//           width={200}
//           height={90}
//           alt="JobSim"
//           priority
//           className="transform transition-transform hover:scale-105 duration-300"
//         />
//       </div>

//       <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>
//       <SignedIn>
//       <ul className={
//         `flex flex-col md:flex-row gap-8 text-lg font-medium text-white
//         absolute md:static top-20 left-0 w-full md:w-auto bg-blue-700 md:bg-transparent p-4 md:p-0 transition-all duration-300
//         ${isMenuOpen ? 'block' : 'hidden md:flex'}`
//       }>
//         {['Home', 'Dashboard', 'Upgrade', 'ATS?'].map((item, index) => {
//           const link = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
//           return (
//             <li
//               key={index}
//               className={`${path === link ? 'text-blue-50 font-extrabold' : 'hover:text-black'} cursor-pointer transition-all duration-300`}
//             >
//               <Link href={link}>{item}</Link>
//             </li>
//           );
//         })}
//       </ul>
//       </SignedIn>
//       <div className="flex items-center gap-4">
//         {isSignedIn ? (
//           <div className="flex items-center gap-2">
//             <span className="text-white font-semibold">Hi, {user?.firstName}!</span>
//             <UserButton className="transform transition-transform hover:scale-110 duration-300 rounded-full border-2 border-blue-500 p-2" />
//           </div>
//         ) : (
//           <Link href={'/dashboard'}>
//             <Button className="px-6 py-2 text-lg font-semibold bg-blue-900 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl duration-300">
//               Get Started
//             </Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }


// export default Header;
import React from "react";
import { Button } from '@/components/ui/button';
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import AddNewInterview from "./AddNewInterview";
// import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  //   const path = usePathname();
//   const { user, isSignedIn, isLoaded } = useUser(); // Using `useUser` from Clerk
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     console.log(isSignedIn);  // Optional: For debugging
//   }, [isSignedIn]);

//   // When Clerk is still loading the authentication state, return null or a loading indicator.
//   if (!isLoaded) {
//     return null; // You can show a simple loading spinner here if needed.
//   }
  // await checkUser();

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-black via-blue-950 to-blue-900 shadow-xl relative">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src={'/image.png'}
            width={200}
            height={90}
            alt="JobSim"
            priority
            className="transform transition-transform hover:scale-105 duration-300"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Services</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/ats" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    ATS Checker
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href='/upgrade' className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Pricing
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <Button className="hidden md:inline-flex items-center gap-2">
              <SignUpButton>
                Sign Up
              </SignUpButton>
            </Button>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}