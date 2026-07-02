export function ModalSheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="re-sheet__backdrop" onClick={onClose} />
      <div className="re-sheet re-sheet--modal" style={{ animation: "re-sheet-up 260ms cubic-bezier(.3,.8,.3,1)" }}>
        <div className="re-sheet__handle" />
        <div style={{ overflowY: "auto", padding: "18px 20px 28px" }}>{children}</div>
      </div>
    </>
  );
}
