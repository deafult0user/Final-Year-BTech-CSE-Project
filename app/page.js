import { Button } from "@/components/ui/button";
import "regenerator-runtime/runtime";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import Chatbot from "@/components/Chatbot";



export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">

        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 lg:px-24 py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          {/* Text Section */}
          <div
            className="text-center lg:text-left space-y-6"
            data-aos="fade-right"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              Ace Your Next <br />
              <span className="text-blue-600">Interview</span> With Confidence
            </h1>
            <p className="text-gray-600 text-lg">
              Simulate real interview scenarios with our AI-powered platform. <br />
              Personalized practice to land your dream job.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 text-white px-6 py-3 rounded-lg transition-all">
                  Get Started
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center animate-fade-in-up" data-aos="fade-left">
            <Image
              src={"/hello.jpg"} // Replace with your image path
              alt="Interview AI"
              width={500}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 lg:px-24 bg-white">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Realistic Simulations", text: "Tailored to your career goals." },
              { title: "AI Feedback", text: "Receive actionable insights." },
              { title: "Mock Interviews", text: "Practice with instant scoring." },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-lg text-center hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>


        <div className="flex p-10 flex-col md:flex-row md:justify-evenly">
          <div className="flex-col md:flex-row gap-6 md:px-10 flex">
            <div className="md:w-2/3 w-full">
              <video className="rounded-xl" autoPlay muted loop>
                <source src="/content/video-3.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex-col border p-4 rounded-xl md:w-2/5">
              <div className="text-4xl flex justify-center text-center
                md:text-6xl
                bg-gradient-to-l
                from-yellow-300
                to-blue-300
                bg-clip-text
                font-bold
                text-transparent
                ">
                Fully Customizable eCommerce
              </div>

              <div className="md:px-20 space-y-6 flex-col items-center justify-center">
                <div className="text-lg pt-10 flex gap-4">
                  <Image
                    src="/images/icon-store.png"
                    alt="feature-1"
                    width={70}
                    height={70}
                  />
                  <div className="flex flex-col gap-2">
                    Choose from a variety of store templates to get started. And customize your store to fit your brand.
                  </div>
                </div>

                <div className="flex-col">
                  <div className="text-lg flex items-center gap-5" >
                    <Image
                      src="/images/icon-product.png"
                      alt="feature-1"
                      width={70}
                      height={70}
                    />
                    <div>
                      Add unlimited products and variations. And manage your inventory with ease.
                    </div>
                  </div>
                </div>

                <div className="flex-col">
                  <div className="text-lg flex items-center gap-5" >
                    <Image
                      src="/images/icon-analytics.png"
                      alt="feature-1"
                      width={70}
                      height={70}
                    />
                    <div>
                      Gain valuable insights into your customers and products with
                      our analytics tools.
                    </div>
                  </div>
                </div>

                <div className="flex-col">
                  <div className="text-lg flex items-center gap-5" >
                    <Image
                      src="/images/icon-shield.png"
                      alt="feature-1"
                      width={70}
                      height={70}
                    />
                    <div>
                      Best in class security to protect your data and your customers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center flex justify-center md:py-10">
          <div className="text-center md:text-6xl text-4xl 
        bg-gradient-to-r
        from-blue-800
        to-purple-300
        bg-clip-text
        text-transparent
        pb-10
        font-bold
        
        ">
            Content Management System.Made Simple.

            <div className="justify-center items-center flex md:pt-10 p-10">
              <video className="rounded-xl md:w-2/3" autoPlay muted loop>
                <source src="/content/video-4.mp4" type="video/mp4" />

              </video>

            </div>

          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center">
          <div className=" text-4xl text-center md:text-6xl font-bold bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent md:pb-10 ">
            Pricing
            <div className="text-2xl text-center md:text-4xl font-bold md:py-10">
              Simple and transparent pricing plans for all businesses.
            </div>
          </div>
        </div> */}

          <section className="relative py-20 px-6 lg:px-24 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-aos="fade-down">
                Ready to Ace Your Interview?
              </h2>
              <p className="text-lg mb-8" data-aos="fade-up">
                Join thousands of candidates preparing for their dream jobs!
              </p>
              <h2
                className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                data-aos="fade-down"
              >
                Elevate Your Interview Game
              </h2>
              <p
                className="text-lg lg:text-xl mb-10 opacity-90"
                data-aos="fade-up"
              >
                Get personalized interview practice, real-time feedback, and expert insights—everything you need to land your dream job.
              </p>
              <Link href="/dashboard">
                <Button
                  className="px-10 py-4 text-blue-600 bg-white font-semibold rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                  data-aos="zoom-in"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Subtle Background Elements */}
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-10 rounded-full filter blur-3xl -z-10"
              data-aos="fade-up-right"
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white opacity-10 rounded-full filter blur-2xl -z-10"
              data-aos="fade-down-left"
            ></div>
          </section>


          <Chatbot/>
      </main>
    </>
  );
}
