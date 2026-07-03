import { AlertIcon } from "./icons.jsx";

export function TextField({ label, value, onChange, placeholder, type = "text", error, hint, rightSlot, ...rest }) {
  return (
    <div className="re-field">
      {label && <label className="re-field__label">{label}</label>}
      <div className="re-field__wrap">
        <input
          className={`re-input ${error ? "re-input--error" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {rightSlot}
      </div>
      {error && <div className="re-field__error"><AlertIcon size={14} />{error}</div>}
      {!error && hint && <div className="re-field__hint">{hint}</div>}
    </div>
  );
}

export function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div className="re-field">
      {label && <label className="re-field__label">{label}</label>}
      <textarea className="re-input" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
