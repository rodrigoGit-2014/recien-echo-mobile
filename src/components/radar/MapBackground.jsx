export function MapBackground() {
  return (
    <div className="re-map">
      {/* manzanas */}
      {[
        [4, 8, 22, 16], [30, 6, 18, 14], [52, 10, 20, 12], [76, 6, 20, 16],
        [6, 30, 18, 14], [28, 28, 16, 16], [50, 32, 18, 14],
        [4, 50, 20, 14], [30, 48, 18, 16], [54, 50, 18, 14], [76, 46, 18, 16],
        [8, 70, 18, 14], [32, 72, 18, 14], [56, 70, 18, 16], [78, 68, 18, 16],
      ].map(([x, y, w, h], i) => (
        <div key={i} className="re-map__block" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
      ))}
      {/* parques */}
      <div className="re-map__park" style={{ left: "12%", top: "44%", width: "16%", height: "12%" }} />
      <div className="re-map__park" style={{ left: "58%", top: "16%", width: "14%", height: "10%" }} />
      <div className="re-map__park" style={{ left: "68%", top: "58%", width: "12%", height: "10%" }} />
      {/* agua */}
      <div className="re-map__water" style={{ left: "-6%", top: "78%", width: "60%", height: "20%" }} />
      {/* calles secundarias diagonales */}
      {[12, 26, 40, 54, 68, 82].map((p, i) => (
        <div key={"d" + i} className="re-map__street" style={{ left: 0, top: `${p}%`, width: "100%", height: "2px", transform: "rotate(-3deg)" }} />
      ))}
      {[8, 24, 42, 60, 78, 94].map((p, i) => (
        <div key={"v" + i} className="re-map__street" style={{ top: 0, left: `${p}%`, width: "2px", height: "100%", transform: "rotate(2deg)" }} />
      ))}
      {/* avenidas principales */}
      <div className="re-map__avenue" style={{ left: 0, top: "35%", width: "100%", height: "5px" }} />
      <div className="re-map__avenue" style={{ top: 0, left: "44%", width: "5px", height: "100%" }} />
      {/* avenida resaltada */}
      <div className="re-map__highlight" style={{ left: 0, top: "58%", width: "100%", height: "4px", transform: "rotate(-2deg)" }} />
      {/* etiquetas */}
      <div className="re-map__label" style={{ left: "16%", top: "42%" }}>Parque Los Aromos</div>
      <div className="re-map__label" style={{ left: "8%", top: "33%" }}>AV. LIBERTADOR</div>
      <div className="re-map__label" style={{ left: "46%", top: "20%" }}>CALLE MANUEL MONTT</div>
      <div className="re-map__label" style={{ left: "62%", top: "78%" }}>Río Mapocho</div>
    </div>
  );
}

export function UserMarker({ x, y }) {
  return (
    <div className="re-user-marker" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="re-user-marker__halo" />
      <div className="re-user-marker__sonar" />
      <div className="re-user-marker__dot" />
    </div>
  );
}
