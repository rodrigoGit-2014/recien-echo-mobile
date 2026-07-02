import { useRef, useState } from "react";
import { AlertIcon, EyeIcon, EyeOffIcon } from "./icons.jsx";

// Entrada de contraseña de 4 dígitos: reemplaza al campo de texto libre.
// `secure` la enmascara como PIN (con toggle para revelarla); úsalo también,
// sin `secure`, para códigos de verificación visibles.
export function PinInput({ length = 4, value, onChange, secure = false, label, error, autoFocus }) {
  const [revealed, setRevealed] = useState(!secure);
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  function setDigit(i, raw) {
    const d = raw.replace(/[^0-9]/g, "").slice(-1);
    const next = digits.slice();
    next[i] = d;
    onChange(next.join(""));
    if (d && i < length - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (text) {
      e.preventDefault();
      onChange(text);
    }
  }

  return (
    <div className="re-field">
      {(label || secure) && (
        <div className="re-pin-header">
          {label && <label className="re-field__label">{label}</label>}
          {secure && (
            <button type="button" className="re-pin-eye" onClick={() => setRevealed((r) => !r)}>
              {revealed ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
              {revealed ? "Ocultar" : "Mostrar"}
            </button>
          )}
        </div>
      )}
      <div className="re-code-inputs" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`re-code-digit ${error ? "re-code-digit--error" : ""}`}
            value={d}
            maxLength={1}
            inputMode="numeric"
            type={revealed ? "text" : "password"}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={autoFocus && i === 0}
          />
        ))}
      </div>
      {error && <div className="re-field__error"><AlertIcon size={14} />{error}</div>}
    </div>
  );
}
