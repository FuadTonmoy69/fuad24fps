export interface FolderPalette {
  dark: string;
  light: string;
  sheen: string;
}

export default function FolderIcon({ dark, light, sheen }: FolderPalette) {
  return (
    <svg viewBox="0 0 104 84" width={100} height={80} fill="none" aria-hidden>
      {/* back panel with the ear tab on the top-left */}
      <path
        d="M4 22 Q4 13 13 13 L38 13 Q41 13 43 10.5 L46 7.5 Q47.5 6 49.5 6 L91 6 Q100 6 100 15 L100 30 L4 30 Z"
        fill={dark}
      />
      {/* front body */}
      <rect x="4" y="24" width="96" height="56" rx="11" fill={light} />
      {/* rim highlight along the front's top edge */}
      <path d="M15 24 H89 Q100 24 100 35 L100 30 Q100 24 89 24 Z" fill={sheen} opacity=".55" />
      <rect x="4" y="24" width="96" height="9" rx="9" fill="#fff" opacity=".16" />
    </svg>
  );
}
