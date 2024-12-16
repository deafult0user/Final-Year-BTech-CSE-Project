import { Button } from "@/components/ui/button";
import 'regenerator-runtime/runtime';
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <>
      {/* Header/NavBar */}
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 lg:px-24 py-16 bg-white">
          {/* Text Section */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              Ace Your Next <br />
              <span className="text-blue-600">Interview</span> With Confidence
            </h1>
            <p className="text-gray-600 text-lg">
              Simulate real interview scenarios with our AI-powered platform. 
              Personalized practice to land your dream job.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="text-blue-600 border-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center animate-fade-in-up">
            <Image
              src={'/2358.jpg'} // Replace with your image path
              alt="Interview AI"
              width={500}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 lg:px-24 bg-gray-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Realistic Simulations</h3>
              <p className="text-gray-600">
                Experience interview simulations tailored to your career goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">AI Feedback</h3>
              <p className="text-gray-600">
                Receive personalized AI-driven feedback to improve your skills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Mock Interviews</h3>
              <p className="text-gray-600">
                Mock interviews with instant scoring and actionable insights.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-24 text-center bg-blue-600 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of candidates preparing for their dream jobs!
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
              Start Now
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-white bg-gray-800">
          <p>&copy; {new Date().getFullYear()} JobSim AI. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
