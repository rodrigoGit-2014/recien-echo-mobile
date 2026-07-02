// Íconos de línea (trazo 2px, redondeado) dibujados a mano para cada categoría.
export function CatIcon({ id, size = 24, color = "currentColor", strokeWidth = 2, className, style }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    style,
  };

  switch (id) {
    case "pan": // hogaza con cortes
      return (
        <svg {...common}>
          <path d="M3 13c0-4.5 3.8-7.5 9-7.5s9 3 9 7.5c0 3-2.5 5-9 5s-9-2-9-5Z" />
          <path d="M8 7.2 6.5 12.5M12 6v7M16 7.2 17.5 12.5" />
        </svg>
      );
    case "empanadas": // media luna con repulgue
      return (
        <svg {...common}>
          <path d="M4 12c0-5 4-8.5 8-8.5s8 3.5 8 8.5-5 8.5-8 8.5-8-3.5-8-8.5Z" />
          <path d="M7 15.5 8.6 14M9.4 17.3 11 15.8M11.8 19 13.4 17.5" />
        </svg>
      );
    case "pizza": // porción triangular con toppings
      return (
        <svg {...common}>
          <path d="M12 3 21.5 20H2.5L12 3Z" />
          <path d="M4.5 16.2h15" />
          <circle cx="10.2" cy="12.5" r="1" fill={color} stroke="none" />
          <circle cx="13.8" cy="10.2" r="1" fill={color} stroke="none" />
          <circle cx="12" cy="15" r="1" fill={color} stroke="none" />
        </svg>
      );
    case "cafe": // taza con vapor
      return (
        <svg {...common}>
          <path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
          <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
          <path d="M8 3.5c0 1-1 1-1 2s1 1 1 2M12 3.5c0 1-1 1-1 2s1 1 1 2" />
        </svg>
      );
    case "pasteles": // cupcake
      return (
        <svg {...common}>
          <path d="M6.5 12h11l-1.3 8.2a1 1 0 0 1-1 .8H8.8a1 1 0 0 1-1-.8L6.5 12Z" />
          <path d="M5.5 12a6.5 4 0 0 1 13 0Z" />
          <path d="M12 8V4M9.5 6.2 12 4l2.5 2.2" />
        </svg>
      );
    case "sopaipillas": // disco frito con hoyos
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="9" r="0.9" fill={color} stroke="none" />
          <circle cx="15.2" cy="12.5" r="0.9" fill={color} stroke="none" />
          <circle cx="9" cy="13.5" r="0.9" fill={color} stroke="none" />
          <circle cx="12.5" cy="16" r="0.9" fill={color} stroke="none" />
        </svg>
      );
    case "tortas": // torta en capas con cereza
      return (
        <svg {...common}>
          <path d="M4 20h16M5 20v-4.5h14V20M6 15.5v-4h12v4M7.5 11.5v-2.8h9v2.8" />
          <circle cx="12" cy="5.3" r="1.3" fill={color} stroke="none" />
          <path d="M12 6.6v1.8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}
