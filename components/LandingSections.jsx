import React from "react";
import { Button } from './ui/button';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, X } from "lucide-react";

const LandingSections = () => {
  return (
    <div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Capture Your Thoughts with NoteWorthy
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The intelligent note-taking app that helps you organize your
                  ideas, boost productivity, and never forget a thing.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Effortless Note-Taking",
                  description: "Quickly jot down your thoughts with our intuitive interface.",
                  icon: (
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <line x1="16" x2="8" y1="13" y2="13" />
                    </svg>
                  ),
                },
                {
                  title: "Secure Storage",
                  description: "Your notes are encrypted and safely stored in the cloud.",
                  icon: (
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57" />
                    </svg>
                  ),
                },
                {
                  title: "Smart Search",
                  description: "Find any note instantly with our powerful search feature.",
                  icon: (
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary p-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default LandingSections;
