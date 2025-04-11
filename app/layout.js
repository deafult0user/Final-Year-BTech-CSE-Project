import 'regenerator-runtime/runtime';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import DasboardLayout from "./dashboard/layout";
import { Toaster } from '@/components/ui/sonner';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JobSim AI",
  description: "Job Simulator for Online Interview's Training",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          
          {/* <Header /> */}
          <main>{children}</main>
          <Toaster />
          {/* Footer */}
          
        </body>
      </html>
    </ClerkProvider>
  );
}
