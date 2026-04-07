import * as React from "react";

export const IconHome = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M6 20V9a6 6 0 0 1 12 0v11Z" />
  </svg>
);

export const IconBot = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="6" y="8" width="12" height="9" rx="2" />
    <path d="M8 4h8" />
    <path d="M12 4v4" />
    <path d="M3 12h3" />
    <path d="M18 12h3" />
    <circle cx="9.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const IconNews = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="4" y="6" width="16" height="13" rx="2" />
    <path d="M8 10h8" />
    <path d="M8 14h4" />
  </svg>
);

export const IconUser = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-2a6 6 0 0 1 12 0v2Z" />
  </svg>
);

export const IconTrophy = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export const IconPill = ({ className, strokeWidth = 2, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);
