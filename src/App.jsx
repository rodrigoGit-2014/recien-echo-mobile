import { useEffect, useRef, useState } from "react";
import { useNav } from "./navigation/useNav.js";
import { PhoneFrame } from "./components/common/PhoneFrame.jsx";
import { generateBusinessCode } from "./data/businessCode.js";
import { buildMockPins, randomPin, MOCK_BUSINESSES } from "./data/mockData.js";
import { getFreshness } from "./data/formatters.js";

import { SplashScreen } from "./screens/Splash.jsx";
import { ModeSelectScreen } from "./screens/ModeSelect.jsx";
import { VecinoSignupScreen } from "./screens/vecino/VecinoSignup.jsx";
import { LocationPermissionScreen } from "./screens/vecino/LocationPermission.jsx";
import { ProductDetailScreen } from "./screens/vecino/ProductDetail.jsx";
import { RadarScreen } from "./screens/radar/RadarScreen.jsx";

import { CreateBusinessAccountScreen } from "./screens/auth/CreateBusinessAccount.jsx";
import { VerifyEmailScreen } from "./screens/auth/VerifyEmail.jsx";
import { AccountVerifiedScreen } from "./screens/auth/AccountVerified.jsx";
import { LoginScreen } from "./screens/auth/Login.jsx";
import { ForgotPasswordScreen } from "./screens/auth/ForgotPassword.jsx";
import { ResetPasswordScreen } from "./screens/auth/ResetPassword.jsx";
import { PasswordUpdatedScreen } from "./screens/auth/PasswordUpdated.jsx";

import { ConfigureBusinessScreen } from "./screens/business/ConfigureBusiness.jsx";
import { DashboardScreen } from "./screens/business/Dashboard.jsx";
import { CollaboratorsScreen } from "./screens/business/Collaborators.jsx";
import { JoinWithCodeScreen } from "./screens/business/JoinWithCode.jsx";
import { ConfirmBusinessScreen } from "./screens/business/ConfirmBusiness.jsx";

import { PublishProductScreen } from "./screens/emprendedor/PublishProduct.jsx";
import { PublishConfirmationScreen } from "./screens/emprendedor/PublishConfirmation.jsx";

const DEFAULT_BUSINESS = {
  name: "",
  category: "pan",
  address: "",
  description: "",
  code: null,
};

export function App() {
  const nav = useNav();
  const { screen, params } = nav.current;

  const [now, setNow] = useState(Date.now());
  const [pins, setPins] = useState(() => buildMockPins());
  const [business, setBusiness] = useState(DEFAULT_BUSINESS);
  const [collaborators, setCollaborators] = useState([
    { id: "c1", name: "Marisol Pérez", cargo: "Panadera", active: true },
    { id: "c2", name: "Iván Soto", cargo: "Vendedor", active: true },
    { id: "c3", name: "Camila Rojas", cargo: "Encargada de producción", active: false },
  ]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [lastPublished, setLastPublished] = useState(null);
  const spawnCounter = useRef(0);

  // reloj global: actualiza frescura y hace expirar / aparecer pines
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      setPins((prev) => {
        let next = prev.filter((p) => !getFreshness(p.publishedAt, t).expired);
        if (Math.random() < 0.12 && next.length < 16) {
          spawnCounter.current += 1;
          const biz = MOCK_BUSINESSES[Math.floor(Math.random() * MOCK_BUSINESSES.length)];
          next = [
            ...next,
            randomPin(`spawn-${spawnCounter.current}-${t}`, biz, {
              minutesAgo: 0,
              x: 8 + Math.random() * 84,
              y: 14 + Math.random() * 68,
            }),
          ];
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const metrics = {
    postedToday: pins.filter((p) => p.businessId === business.code || p.businessId === "self").length + 3,
    viewsToday: 47,
    collaborators: collaborators.filter((c) => c.active).length,
  };

  function handleSaveBusiness(draft) {
    // El correo ya se verificó antes de llegar aquí (ver CreateBusinessAccountScreen
    // → VerifyEmailScreen → AccountVerifiedScreen → configureBusiness), así que
    // tanto crear como editar el negocio terminan en el panel.
    const code = business.code || generateBusinessCode(draft.category);
    setBusiness((b) => ({ ...b, ...draft, code }));
    nav.go("dashboard");
  }

  function handleLoginSuccess(user) {
    setBusiness((b) => (b.code ? b : {
      name: b.name || `Negocio de ${user.email.split("@")[0]}`,
      category: b.category || "pan",
      address: b.address || "Dirección pendiente de configurar",
      description: "",
      code: generateBusinessCode(b.category || "pan"),
    }));
    nav.go("dashboard");
  }

  function handlePublish({ product, quantity }) {
    const pin = {
      id: `self-${Date.now()}`,
      businessId: "self",
      businessName: business.name || "Tu negocio",
      category: business.category,
      address: business.address || "Tu dirección",
      product,
      quantity,
      publishedAt: Date.now(),
      distanceM: 15,
      walkMin: 1,
      x: 46,
      y: 44,
    };
    setPins((prev) => [pin, ...prev]);
    setLastPublished(pin);
    nav.go("publishConfirmation");
  }

  function handleLogout() {
    setBusiness(DEFAULT_BUSINESS);
    nav.reset("splash");
  }

  let node = null;

  switch (screen) {
    case "splash":
      node = <SplashScreen nav={nav} />;
      break;

    case "modeSelect":
      node = <ModeSelectScreen nav={nav} />;
      break;

    // ---- Vecino ----
    case "vecinoSignup":
      node = <VecinoSignupScreen nav={nav} />;
      break;
    case "locationPermission":
      node = <LocationPermissionScreen nav={nav} />;
      break;
    case "radar":
      node = (
        <RadarScreen
          pins={pins}
          now={now}
          onOpenDetail={(pin) => { setSelectedPin(pin); nav.go("productDetail"); }}
          onOpenProfile={() => nav.go("modeSelect")}
          onOpenNotifications={() => {}}
        />
      );
      break;
    case "productDetail":
      node = <ProductDetailScreen nav={nav} pin={selectedPin} now={now} />;
      break;

    // ---- Negocio: autenticación ----
    case "createBusinessAccount":
      node = <CreateBusinessAccountScreen nav={nav} />;
      break;
    case "verifyEmail":
      node = <VerifyEmailScreen nav={nav} email={params.email || "tunegocio@correo.com"} />;
      break;
    case "accountVerified":
      node = <AccountVerifiedScreen nav={nav} />;
      break;
    case "login":
      node = <LoginScreen nav={nav} onLoginSuccess={handleLoginSuccess} />;
      break;
    case "forgotPassword":
      node = <ForgotPasswordScreen nav={nav} />;
      break;
    case "resetPassword":
      node = <ResetPasswordScreen nav={nav} email={params.email || "tunegocio@correo.com"} />;
      break;
    case "passwordUpdated":
      node = <PasswordUpdatedScreen nav={nav} />;
      break;

    // ---- Negocio: gestión ----
    case "configureBusiness":
      node = (
        <ConfigureBusinessScreen
          nav={nav}
          initial={business}
          editMode={!!params.editMode}
          onSave={handleSaveBusiness}
        />
      );
      break;
    case "dashboard":
      node = <DashboardScreen nav={nav} business={business} metrics={metrics} onLogout={handleLogout} />;
      break;
    case "collaborators":
      node = (
        <CollaboratorsScreen
          nav={nav}
          business={business}
          collaborators={collaborators}
          onAdd={(c) => setCollaborators((prev) => [...prev, { id: `c${Date.now()}`, active: true, ...c }])}
          onEdit={(id, patch) => setCollaborators((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))}
          onToggleActive={(id) => setCollaborators((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))}
          onRegenerateCode={() => setBusiness((b) => ({ ...b, code: generateBusinessCode(b.category) }))}
        />
      );
      break;

    // ---- Colaborador ----
    case "joinWithCode":
      node = <JoinWithCodeScreen nav={nav} onFound={(found) => nav.go("confirmBusiness", { found })} />;
      break;
    case "confirmBusiness":
      node = (
        <ConfirmBusinessScreen
          nav={nav}
          business={params.found}
          onJoin={() => {
            setBusiness((b) => ({ ...b, ...params.found }));
            nav.go("publish");
          }}
        />
      );
      break;

    // ---- Publicar (compartido admin/colaborador) ----
    case "publish":
      node = <PublishProductScreen nav={nav} business={business} onPublish={handlePublish} />;
      break;
    case "publishConfirmation":
      node = <PublishConfirmationScreen nav={nav} business={business} pin={lastPublished} />;
      break;

    default:
      node = <SplashScreen nav={nav} />;
  }

  return <PhoneFrame>{node}</PhoneFrame>;
}
