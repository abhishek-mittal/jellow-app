import { Bell, Heart, Search, Sparkles, ChevronRight } from "lucide-react";

export function HomeHeader() {
  return (
    <div className="bg-black pt-[calc(env(safe-area-inset-top,24px)+16px)] pb-10 px-6 sm:px-8 rounded-b-[40px] shadow-sm flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 bg-gray-800 shrink-0">
          <img src="https://i.pravatar.cc/150?u=makise" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[18px] font-bold text-white tracking-wide">
          Hello, Makise!
        </h1>
        <button className="relative flex h-12 w-12 items-center justify-center shrink-0">
          <Bell size={26} className="text-white" />
          <span className="absolute top-[2px] right-[2px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E94C5F] text-[10px] font-bold text-white px-1 border-2 border-black leading-none">
            2
          </span>
        </button>
      </div>

      {/* Score Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-[#E87A3E] text-[36px] tracking-tight font-black text-white shadow-sm shrink-0">
            61
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h2 className="text-[20px] font-bold text-white tracking-wide">Sandow Score</h2>
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#A0A0A0]">
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="fill-[#A0A0A0] text-[#A0A0A0]" /> Average Fitness
              </span>
              <span className="h-[4px] w-[4px] rounded-full bg-[#A0A0A0]/80" />
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="fill-[#A0A0A0] text-[#A0A0A0]" /> plus
              </span>
            </div>
          </div>
        </div>
        <ChevronRight size={28} className="text-white text-opacity-90 shrink-0" strokeWidth={2.5} />
      </div>

      {/* Search Input */}
      <div className="flex items-center w-full h-[60px] bg-white rounded-full px-5 shadow-sm">
        <Search size={22} className="text-gray-400 mr-3" strokeWidth={2.5} />
        <input
          type="text"
          className="flex-1 bg-transparent text-[16px] font-medium text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium pb-[1px]"
          placeholder="Search sandow..."
        />
      </div>
    </div>
  );
}