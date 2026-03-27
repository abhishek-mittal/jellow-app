import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function SupportBanner() {
  return (
    <div className="relative overflow-hidden bg-black rounded-[28px] w-full mx-auto min-h-[148px] shadow-sm flex items-center">
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8 max-w-[65%]">
        <h3 className="text-white text-[15px] leading-[1.4] font-medium mb-5 tracking-wide">
          Need any help? We're always<br />here to help.
        </h3>
        <button className="flex items-center gap-1.5 text-white font-semibold text-[13px] group hover:opacity-80 transition-opacity w-fit mt-auto">
          Contact Support 
          <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Fitness girl image on the right side */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0 pointer-events-none">
        {/* Mask image for a smooth linear gradient fade from left */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ background: 'linear-gradient(to right, #000000 0%, transparent 80%)' }} 
        />
        {/* Placeholder image from a free resource - using Next.js Image component */}
        <div className="w-full h-full overflow-hidden relative">
          <Image 
            src="/images/support-trainer.jpg" 
            alt="Support Trainer" 
            fill 
            className="object-cover object-center opacity-85" 
          />
        </div>
      </div>
    </div>
  );
}
