import { BrandMark, Wordmark } from "../components/common/Brand.jsx";
import { Button } from "../components/common/Button.jsx";

export function SplashScreen({ nav }) {
  return (
    <div className="re-screen">
      <div className="re-splash">
        <BrandMark size={72} animated />
        <Wordmark size={30} />
        <p className="re-tagline">
          El radar vivo de tu barrio. Descubre lo que está recién hecho cerca de ti, ahora mismo.
        </p>
      </div>
      <div className="re-splash__cta">
        <Button variant="primary" onClick={() => nav.go("modeSelect")}>Empezar</Button>
        <button className="re-btn re-btn--link" onClick={() => nav.go("radar")}>Iniciar sesión</button>
      </div>
    </div>
  );
}
