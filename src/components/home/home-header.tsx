import { seedUser } from "@/lib/seed-data";

/** Warm gradient header with greeting and avatar. */
export function HomeHeader() {
  const firstName = seedUser.name.split(" ")[0];

  return (
    <div className="bg-gradient-to-b from-[#FDDCB5] via-[#FDE8D0] to-[#F8F9FA] pt-[calc(env(safe-area-inset-top,24px)+16px)] pb-6 px-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] text-gray-500">Good morning! 🌞</p>
          <h1 className="text-[28px] font-bold text-gray-900 mt-0.5">
            {firstName}
          </h1>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full bg-s-orange flex items-center justify-center text-[16px] font-bold text-white shrink-0">
          {firstName.charAt(0)}
        </div>
      </div>
    </div>
  );
}