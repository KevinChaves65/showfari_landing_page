"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/banners/1.jpg",
  "/banners/2.jpg",
  "/banners/3.jpg",
  "/banners/4.jpg",
  "/banners/5.jpg",
  "/banners/6.jpg",
  "/banners/7.jpg"
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [current, setCurrent] = useState(0);

  // Rotate banner images every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://v1.nocodeapi.com/showfari/google_sheets/xAgnRsVwKKJRvBhw?tabId=Sheet1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([[email]]),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const errorText = await res.text();
        console.error("Failed to submit:", errorText);
        setErrorMsg("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center">
      {/* 🔹 Rotating banner section */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mb-16">
        <AnimatePresence>
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Showfari banner background"
          />
        </AnimatePresence>

        {/* Overlay tint */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Title */}
        <h1 className="relative z-10 text-6xl font-bold text-white drop-shadow-lg">
          Showfari
        </h1>
      </div>

      {/*  Email section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl px-4"
      >
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-300 mb-6 rounded-full mx-auto" />
        <p className="text-lg md:text-xl mb-8">
          Join our beta and be the first to explore the local scene and
          community here in Toronto.
        </p>

        {submitted ? (
          <p className="text-green-400 text-xl font-semibold">
            Thank you! We'll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4 justify-center"
          >
            <div className="flex flex-col w-full md:w-80">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-full px-5 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 ${
                  errorMsg ? "border-red-500 ring-red-500" : ""
                }`}
              />
              {errorMsg && (
                <span className="text-red-400 text-sm mt-1 text-left">
                  {errorMsg}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-400 hover:to-blue-300 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-pink-400/30 transition-all duration-300 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Submitting...
                </>
              ) : (
                "Notify Me"
              )}
            </Button>
          </form>
        )}
      </motion.div>

      {/* 🔹 Info Section */}
      <Card className="mt-16 bg-white/10 backdrop-blur-lg border border-white/20 w-full max-w-4xl text-white shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">
            What is Showfari?
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
          Showfari is a passion project founded by artists in Toronto’s music and arts scene, designed to make it easier 
          to discover the live experiences that define the city. We aim to connect the community with events and artists, 
          spotlight local talent, fill venues with 
          fans, and welcome newcomers, ensuring the creators shaping Toronto’s sound get the recognition they deserve.
        </p>
        </CardContent>
      </Card>

      <section className="mt-24 max-w-4xl w-full px-4">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Amplify Toronto’s Sound. Discover What’s Next.
        </h2>
        <p className="text-white/90 text-lg leading-relaxed">
            Showfari brings Toronto’s music scene together - artists, promoters, fans, and venues all in one place. 
            Find local shows, 
            follow the people making noise, and get personalized recommendations for what’s next.
          </p>
      </section>

      <section className="mt-24 max-w-4xl w-full px-4">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Let’s Build Showfari Together!
        </h2>
        <p className="text-white/90 text-lg leading-relaxed">
          We’re creating a home for Toronto’s music community and we’d love your help! 
          Join our email waitlist to get access to the beta when it releases, 
          share your feedback, and help shape a platform made for all of us who love the local scene.
        </p>
      </section>

      <section className="mt-24 max-w-4xl w-full px-4">
        <h2 className="text-3xl font-semibold mb-4 text-white">Contact us</h2>
        <p className="text-white/90 text-lg leading-relaxed">
          Questions or suggestions? Shoot us an email at: showfari.team@gmail.com
        </p>
        <br/>
      </section>
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl px-4"
      >
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-300 mb-6 rounded-full mx-auto" />
        <p className="text-lg md:text-xl mb-8">
          Join our waitlist today!
        </p>

        {submitted ? (
          <p className="text-green-400 text-xl font-semibold">
            Thank you! We'll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4 justify-center"
          >
            <div className="flex flex-col w-full md:w-80">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-full px-5 py-3 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 ${
                  errorMsg ? "border-red-500 ring-red-500" : ""
                }`}
              />
              {errorMsg && (
                <span className="text-red-400 text-sm mt-1 text-left">
                  {errorMsg}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-400 hover:to-blue-300 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-pink-400/30 transition-all duration-300 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Submitting...
                </>
              ) : (
                "Notify Me"
              )}
            </Button>
          </form>
        )}
      </motion.div>
      <footer className="mt-20 border-t border-white/20 pt-6 text-sm text-white/60">
        &copy; {new Date().getFullYear()} Showfari — All rights reserved.
      </footer>
    </main>
  );
}
