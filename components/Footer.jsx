import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { MainRoutes } from "@/lib/helpers";

const SocialLink = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:${hoverColor}`}
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ to, children }) => {
  return (
    <li>
      <Link
        href={to}
        className="hover:underline text-gray-300 hover:text-gray-100"
      >
        {children}
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <>
    <div className="w-full bg-black text-gray-300 hover:text-gray-100 py-8 container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {MainRoutes.map((route) => (
              <FooterLink key={route.href} to={route.href}>
                {route.label}
              </FooterLink>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <p>
          Made by -<br/><Link href={'https://anuragoyalportfolio.netlify.app/'}><strong>Anurag Goyal</strong></Link> <br/> <Link href={'https://lavishasaroha.netlify.app/'}><strong>Lavisha</strong></Link>
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Services</h3>
          <ul>
            <FooterLink to="/dashboard">
              Interview Preparation
            </FooterLink>
            {/* <FooterLink to="/services/career-coaching">
              Career Coaching
            </FooterLink> */}
            <FooterLink to="/ats">
              Resume Building
            </FooterLink>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p className="mb-4">SRM University, Sonepat</p>
          <div className="flex gap-4">
            <SocialLink
              href="https://facebook.com"
              icon={<Facebook size={24} />}
              hoverColor="text-blue-500"
            />
            <SocialLink
              href="https://twitter.com"
              icon={<Twitter size={24} />}
              hoverColor="text-blue-400"
            />
            <SocialLink
              href="https://instagram.com"
              icon={<Instagram size={24} />}
              hoverColor="text-pink-500"
            />
            <SocialLink
              href="https://linkedin.com"
              icon={<Linkedin size={24} />}
              hoverColor="text-blue-700"
            />
          </div>
        </div>
      </div>
      <footer className="w-full text-center bg-black text-gray-300 hover:text-gray-100 py-8 container mx-auto px-4 md:px-8">
    <p>
      &copy; {new Date().getFullYear()}{" "}
      <span className="text-indigo-400">JobSim AI</span>. All rights reserved.<br />
    </p>

  </footer>
    </div>
    
  </>
  );
};

export default Footer;
