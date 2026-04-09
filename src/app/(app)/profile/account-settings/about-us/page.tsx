"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";
import { ChevronLeft, MapPin, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function AboutUsPage() {
  const router = useRouter();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <MotionPage className="min-h-screen bg-s-cream pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="flex items-center gap-3 px-5 pb-4 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-s-gray/20 text-s-black active:bg-s-gray/30"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[22px] font-extrabold text-s-black">
            About Us
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-5 px-4 pt-6">
        {/* Company Logo */}
        <MotionItem>
          <div className="flex justify-center py-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-s-orange">
              <span className="text-4xl font-bold text-white">+</span>
            </div>
          </div>
        </MotionItem>

        {/* Company Name */}
        <MotionItem>
          <div className="text-center">
            <h2 className="text-[28px] font-black text-s-black">jellow</h2>
            <p className="text-sm text-s-gray">AI Health & Nutrition Solution</p>
          </div>
        </MotionItem>

        {/* Address */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-gray/30">
                <MapPin size={18} className="text-s-black" />
              </div>
              <h3 className="font-bold text-s-black">Address</h3>
            </div>
            <div className="text-sm text-s-gray">
              <p>578 Boolean Ave</p>
              <p>Turing St</p>
              <p>New York, NY</p>
            </div>
          </div>
        </MotionItem>

        {/* Phone */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-gray/30">
                <Phone size={18} className="text-s-black" />
              </div>
              <h3 className="font-bold text-s-black">Telephone</h3>
            </div>
            <div className="text-sm text-s-gray">
              <p>+123-456-789</p>
              <p>+44-887-449</p>
            </div>
          </div>
        </MotionItem>

        {/* Social Links */}
        <MotionItem>
          <div className="flex justify-center gap-6 py-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center text-s-black"
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
