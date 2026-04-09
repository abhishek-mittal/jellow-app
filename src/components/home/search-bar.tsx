import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search jellow..."
        className="w-full h-12 pl-11 pr-4 rounded-[var(--r-md)] bg-surface-card border border-surface-divider text-[15px] text-s-dark-gray placeholder:text-nav-inactive focus:outline-none focus:ring-2 focus:ring-s-orange/30 focus:border-s-orange transition-colors"
        readOnly
      />
    </div>
  );
}
