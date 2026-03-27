'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Instagram, Facebook, Linkedin, Plus } from 'lucide-react';

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Top Banner/Image Section */}
      <div className="relative h-[300px] w-full flex-shrink-0 bg-gradient-to-b from-gray-200 to-white overflow-hidden">
        {/* Placeholder for gym equipment background */}
        <div 
          className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-top mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white" />
        
        {/* Orange Plus Icon */}
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-16 h-16 bg-[#ff6b00] rounded-[18px] flex items-center justify-center shadow-md z-10">
          <Plus size={36} className="text-white" strokeWidth={3.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col items-center">
        <h1 className="text-[32px] leading-tight font-extrabold text-slate-900 mb-1 mt-2 text-center tracking-tight">
          Sign In To Sandow
        </h1>
        <p className="text-base text-slate-500 mb-10 text-center px-4 font-medium">
          Let's personalize your fitness with AI
        </p>

        {/* Form Container */}
        <div className="w-full max-w-sm space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5 ">
            <label className="text-[15px] font-bold text-slate-900 ml-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="elementary221b@gmail.com"
              startContent={
                <Mail className="text-slate-800 flex-shrink-0" strokeWidth={2.5} size={20} />
              }
              classNames={{
                inputWrapper:
                  "bg-[#F3F4F6] border-transparent hover:bg-slate-200 focus-within:!bg-white focus-within:!border-[#ff6b00] border-2 shadow-none rounded-[22px] h-[60px] px-4 transition-colors",
                input: "text-slate-900 placeholder:text-slate-500 text-[16px] font-medium ml-2",
              }}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[15px] font-bold text-slate-900 ml-1">
              Password
            </label>
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="***********"
              startContent={
                <Lock className="text-slate-800 flex-shrink-0" strokeWidth={2.5} size={20} />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeOff className="text-slate-400" strokeWidth={2.5} size={22} />
                  ) : (
                    <Eye className="text-slate-400" strokeWidth={2.5} size={22} />
                  )}
                </button>
              }
              classNames={{
                inputWrapper:
                  "bg-[#F3F4F6] border-transparent hover:bg-slate-200 focus-within:!bg-white focus-within:!border-transparent border-2 shadow-none rounded-[22px] h-[60px] px-4 transition-colors",
                input: "text-slate-900 placeholder:text-slate-600 text-[16px] font-medium ml-2 tracking-widest",
              }}
            />
          </div>

          {/* Sign In Button */}
          <Button
            className="w-full h-[60px] bg-[#111111] hover:bg-black text-white rounded-[22px] font-semibold text-[17px] flex items-center justify-center gap-2 mt-6 transition-transform active:scale-[0.98]"
            endContent={<ArrowRight size={20} strokeWidth={2.5} />}
          >
            Sign In
          </Button>

          {/* Social Logins */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              isIconOnly
              variant="bordered"
              className="w-[60px] h-[60px] rounded-[20px] border-slate-200 hover:bg-slate-50 bg-white"
            >
              <Instagram size={24} className="text-slate-700" />
            </Button>
            <Button
              isIconOnly
              variant="bordered"
              className="w-[60px] h-[60px] rounded-[20px] border-slate-200 hover:bg-slate-50 bg-white"
            >
              <Facebook size={24} className="text-slate-700" />
            </Button>
            <Button
              isIconOnly
              variant="bordered"
              className="w-[60px] h-[60px] rounded-[20px] border-slate-200 hover:bg-slate-50 bg-white"
            >
              <Linkedin size={24} className="text-slate-700" />
            </Button>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 pt-6 pb-2">
            <div className="text-[15px] font-medium text-slate-500">
              Don't have an account?{" "}
              <Link href={"/auth/sign-up" as any} className="text-[#ff6b00] hover:underline cursor-pointer font-semibold">
                Sign Up.
              </Link>
            </div>
            <Link href={"/auth/forgot-password" as any} className="text-[15px] font-semibold text-[#ff6b00] hover:underline">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}