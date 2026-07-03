function mkIcon(paths, viewBox = "0 0 24 24") {
  return function Icon({ size = 20, color = "currentColor", strokeWidth = 2, className, style }) {
    return (
      <svg width={size} height={size} viewBox={viewBox} fill="none" stroke={color}
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        className={className} style={style}>
        {paths}
      </svg>
    );
  };
}

export const ArrowLeftIcon = mkIcon(<path d="M19 12H5M12 19l-7-7 7-7" />);
export const ChevronRightIcon = mkIcon(<path d="M9 18l6-6-6-6" />);
export const ChevronDownIcon = mkIcon(<path d="M6 9l6 6 6-6" />);
export const EyeIcon = mkIcon(<><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const EyeOffIcon = mkIcon(<><path d="M3 3l18 18" /><path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c7 0 10.5 7 10.5 7a13.2 13.2 0 0 1-3.1 3.9M6.6 6.7C3.6 8.6 1.5 12 1.5 12s3.5 7 10.5 7c1.4 0 2.7-.3 3.8-.7" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>);
export const AlertIcon = mkIcon(<><circle cx="12" cy="12" r="9.5" /><path d="M12 8v5" /><circle cx="12" cy="16" r="0.6" fill="currentColor" /></>);
export const MailIcon = mkIcon(<><rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="M3.5 6.5 12 13l8.5-6.5" /></>);
export const BellIcon = mkIcon(<><path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>);
export const UserIcon = mkIcon(<><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" /></>);
export const MapPinIcon = mkIcon(<><path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" /></>);
export const ClockIcon = mkIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>);
export const ShareIcon = mkIcon(<><circle cx="6" cy="12" r="2.3" /><circle cx="18" cy="6" r="2.3" /><circle cx="18" cy="18" r="2.3" /><path d="M8 10.8 16 6.9M8 13.2l8 3.9" /></>);
export const PencilIcon = mkIcon(<><path d="M4 20l1-4.2L15.5 5.3a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20Z" /><path d="M14 6.8l3.2 3.2" /></>);
export const PowerIcon = mkIcon(<><path d="M12 3v8" /><path d="M6.5 6.5a8 8 0 1 0 11 0" /></>);
export const PlusIcon = mkIcon(<path d="M12 5v14M5 12h14" />);
export const MinusIcon = mkIcon(<path d="M5 12h14" />);
export const BoltIcon = mkIcon(<path d="M12.5 2 4 14h6.2l-1.2 8L20 10h-6.4l1.9-8Z" />);
export const CheckIcon = mkIcon(<path d="M4.5 12.5 9.5 17.5 19.5 6.5" />);
export const XIcon = mkIcon(<path d="M5 5l14 14M19 5 5 19" />);
export const LocationIcon = mkIcon(<><path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" /></>);
export const CameraIcon = mkIcon(<><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" /><circle cx="12" cy="13" r="3.4" /></>);
export const CardIcon = mkIcon(<><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 9.5h19" /></>);
export const CrosshairIcon = mkIcon(<><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>);
export const LogoutIcon = mkIcon(<><path d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H9" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>);
export const SettingsIcon = mkIcon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 13.9a7.9 7.9 0 0 0 0-3.8l2-1.5-2-3.4-2.3.9a8 8 0 0 0-3.3-1.9L13.4 2h-4l-.4 2.2a8 8 0 0 0-3.3 1.9l-2.3-.9-2 3.4 2 1.5a7.9 7.9 0 0 0 0 3.8l-2 1.5 2 3.4 2.3-.9a8 8 0 0 0 3.3 1.9l.4 2.2h4l.4-2.2a8 8 0 0 0 3.3-1.9l2.3.9 2-3.4-2-1.5Z" /></>);
export const TeamIcon = mkIcon(<><circle cx="8.5" cy="8" r="3" /><circle cx="16" cy="9" r="2.4" /><path d="M2.5 19c.8-3.4 3-5.2 6-5.2s5.2 1.8 6 5.2" /><path d="M14.8 14.2c2.3.3 3.7 1.8 4.3 4.3" /></>);
export const TrashIcon = mkIcon(<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></>);
