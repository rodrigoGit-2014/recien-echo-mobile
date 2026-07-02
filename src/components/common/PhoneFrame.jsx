function StatusBar() {
  return (
    <div className="re-statusbar">
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.5"/><rect x="5" y="4.5" width="3" height="7.5" rx="0.5"/><rect x="10" y="2" width="3" height="10" rx="0.5"/><rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.35"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 4.5a10 10 0 0 1 14 0M3.5 7a6.4 6.4 0 0 1 9 0M6.2 9.4a2.6 2.6 0 0 1 3.6 0" strokeLinecap="round"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" opacity="0.4"/><rect x="2" y="2" width="15" height="8" rx="1.3" fill="currentColor"/><rect x="22.5" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.4"/></svg>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }) {
  return (
    <div className="re-device">
      <div className="re-device__screen">
        <StatusBar />
        <div className="re-device__island" />
        {children}
        <div className="re-device__home" />
      </div>
    </div>
  );
}
