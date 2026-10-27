import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const SlidersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9M4 12h5M13 12h7" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
    <circle cx="11" cy="12" r="2" />
  </svg>
);

export const GradCapIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 9.5 12 4.5l10 5-10 5-10-5Z" />
    <path d="M6 12v4.5c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8V12" />
    <path d="M22 9.5V15" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3" />
    <circle cx="5.5" cy="9.5" r="2.2" />
    <circle cx="18.5" cy="9.5" r="2.2" />
    <path d="M6.5 19v-1.2A3.8 3.8 0 0 1 10.3 14h3.4a3.8 3.8 0 0 1 3.8 3.8V19" />
    <path d="M2 18.5v-.7a3 3 0 0 1 3-3M22 18.5v-.7a3 3 0 0 0-3-3" />
  </svg>
);

export const TimerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10 2.5h4M12 2.5V5" />
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.5 1.5" />
    <path d="m19 5.5 1.2 1.2" />
  </svg>
);

export const ChevronIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.6} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const SpinnerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5.5a1 1 0 1 1 2 0V13a1 1 0 1 1-2 0V7.5Zm1 9.9a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
  </svg>
);

export const RetryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </svg>
);

export const FilePlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4v3" />
    <path d="m14 3 5 5" />
    <path d="M18 14v6M15 17h6" />
  </svg>
);

export const FileXIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="m10 12.5 4 4m0-4-4 4" />
  </svg>
);

export const FileIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const TelegramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m21.5 3-6.8 19-4-8.2L2.5 9.8 21.5 3Z" />
    <path d="M21.5 3 10.7 13.8" />
  </svg>
);

export const VkIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="m4 6.5 4.5 11 4.5-11" />
    <path d="M16.5 6.5v11" />
    <path d="m16.5 12.2 4.5-5.7" />
    <path d="m16.5 12.2 4.5 5.7" />
  </svg>
);
