import { useEffect, useState } from "react";
import { useNav } from "./navigation/useNav.js";
import { PhoneFrame } from "./components/common/PhoneFrame.jsx";
import { generateBusinessCode } from "./data/businessCode.js";

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
  lat: null,
  lng: null,
};

const API_BASE = "/api";

export function App() {
  const nav = useNav();
  const { screen, params } = nav.current;

  const [business, setBusiness] = useState(DEFAULT_BUSINESS);
  const [collaborators, setCollaborators] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [lastPublished, setLastPublished] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Cargar ubicación del usuario si está logueado como vecino
  useEffect(() => {
    async function loadVecinoLocation() {
      if (!userEmail) return;
      try {
        const res = await fetch(`${API_BASE}/vecino/${encodeURIComponent(userEmail)}`);
        const data = await res.json();
        if (data.ok && data.vecino && data.vecino.lat && data.vecino.lng) {
          setUserLocation({ lat: data.vecino.lat, lng: data.vecino.lng });
        }
      } catch (err) {
        console.error("Error cargando ubicación:", err);
      }
    }
    loadVecinoLocation();
  }, [userEmail]);

  const metrics = {
    postedToday: 3,
    viewsToday: 47,
    collaborators: collaborators.filter((c) => c.active).length,
  };

  async function handleSaveBusiness(draft) {
    const email = draft.email || userEmail || params.email;
    if (email) {
      try {
        const res = await fetch(`${API_BASE}/business`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...draft }),
        });
        const data = await res.json();
        if (data.ok && data.business) {
          setBusiness(data.business);
          nav.go("dashboard");
          return;
        }
      } catch (err) {
        console.error("Error guardando negocio:", err);
      }
    }
    const code = business.code || generateBusinessCode(draft.category);
    setBusiness((b) => ({ ...b, ...draft, code }));
    nav.go("dashboard");
  }

  async function loadCollaborators(email) {
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/collaborators/${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.ok) {
        setCollaborators(data.collaborators || []);
      }
    } catch (err) {
      console.error("Error cargando colaboradores:", err);
    }
  }

  async function handleLoginSuccess(user) {
    setUserEmail(user.email);
    try {
      const res = await fetch(`${API_BASE}/business/${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.ok && data.business) {
        setBusiness(data.business);
        await loadCollaborators(user.email);
        nav.go("dashboard");
        return;
      }
    } catch (err) {
      console.error("Error cargando negocio:", err);
    }
    setBusiness((b) => (b.code ? b : {
      name: b.name || `Negocio de ${user.email.split("@")[0]}`,
      category: b.category || "pan",
      address: b.address || "Dirección pendiente de configurar",
      description: "",
      code: generateBusinessCode(b.category || "pan"),
      lat: null,
      lng: null,
    }));
    nav.go("dashboard");
  }

  async function handleAddCollaborator({ name, cargo }) {
    const email = userEmail;
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessEmail: email, name, cargo }),
      });
      const data = await res.json();
      if (data.ok && data.collaborator) {
        setCollaborators((prev) => [...prev, data.collaborator]);
      }
    } catch (err) {
      console.error("Error añadiendo colaborador:", err);
    }
  }

  async function handleEditCollaborator(id, { name, cargo }) {
    const email = userEmail;
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/collaborators/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessEmail: email, name, cargo }),
      });
      const data = await res.json();
      if (data.ok && data.collaborator) {
        setCollaborators((prev) => prev.map((c) => (c.id === id ? data.collaborator : c)));
      }
    } catch (err) {
      console.error("Error editando colaborador:", err);
    }
  }

  async function handleToggleCollaborator(id) {
    const email = userEmail;
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/collaborators/${id}/toggle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessEmail: email }),
      });
      const data = await res.json();
      if (data.ok && data.collaborator) {
        setCollaborators((prev) => prev.map((c) => (c.id === id ? data.collaborator : c)));
      }
    } catch (err) {
      console.error("Error toggle colaborador:", err);
    }
  }

  async function handleDeleteCollaborator(id) {
    const email = userEmail;
    if (!email) return;
    try {
      const res = await fetch(`${API_BASE}/collaborators/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessEmail: email }),
      });
      const data = await res.json();
      if (data.ok) {
        setCollaborators((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Error eliminando colaborador:", err);
    }
  }

  async function handlePublish({ product, quantity, category, confidence }) {
    try {
      const res = await fetch(`${API_BASE}/publications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessEmail: userEmail,
          product,
          quantity,
          category,
          confidence,
        }),
      });
      const data = await res.json();

      const pin = {
        id: data.publication?.id || `self-${Date.now()}`,
        businessId: "self",
        businessName: business.name || "Tu negocio",
        category: business.category,
        address: business.address || "Tu dirección",
        product,
        quantity,
        publishedAt: Date.now(),
        distanceM: 15,
        walkMin: 1,
      };
      setLastPublished(pin);
      nav.go("publishConfirmation");
    } catch (err) {
      console.error("Error publicando:", err);
    }
  }

  function handleLogout() {
    setBusiness(DEFAULT_BUSINESS);
    setUserEmail(null);
    setUserLocation(null);
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
    case "loginVecino":
      node = (
        <LoginScreen
          nav={nav}
          role="vecino"
          onLoginSuccess={async (user) => {
            setUserEmail(user.email);
            try {
              const res = await fetch(`${API_BASE}/vecino/${encodeURIComponent(user.email)}`);
              const data = await res.json();
              if (data.ok && data.vecino) {
                if (data.vecino.lat && data.vecino.lng) {
                  setUserLocation({ lat: data.vecino.lat, lng: data.vecino.lng });
                }
              } else {
                await fetch(`${API_BASE}/vecino`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: user.email }),
                });
              }
            } catch (err) {
              console.error("Error cargando vecino:", err);
            }
            nav.go("radar");
          }}
        />
      );
      break;
    case "locationPermission":
      node = (
        <LocationPermissionScreen
          nav={nav}
          email={params.email || userEmail}
          onLocationObtained={(loc) => setUserLocation(loc)}
        />
      );
      break;
    case "radar":
      node = (
        <RadarScreen
          userLocation={userLocation}
          onOpenDetail={(pub) => { setSelectedPin(pub); nav.go("productDetail"); }}
          onOpenProfile={() => nav.go("modeSelect")}
          onOpenNotifications={() => {}}
        />
      );
      break;
    case "productDetail":
      node = <ProductDetailScreen nav={nav} pin={selectedPin} now={Date.now()} />;
      break;

    // ---- Negocio: autenticación ----
    case "createBusinessAccount":
      node = <CreateBusinessAccountScreen nav={nav} />;
      break;
    case "verifyEmail":
      node = <VerifyEmailScreen nav={nav} email={params.email || "tunegocio@correo.com"} role={params.role} />;
      break;
    case "accountVerified":
      node = (
        <AccountVerifiedScreen
          nav={nav}
          email={params.email}
          role={params.role}
          onContinue={async () => {
            setUserEmail(params.email);
            if (params.role === "vecino") {
              try {
                await fetch(`${API_BASE}/vecino`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: params.email }),
                });
              } catch (err) {
                console.error("Error guardando vecino:", err);
              }
              nav.go("locationPermission", { email: params.email });
            } else {
              nav.go("configureBusiness", { email: params.email });
            }
          }}
        />
      );
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
          email={userEmail || params.email}
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
          onAdd={handleAddCollaborator}
          onEdit={handleEditCollaborator}
          onToggleActive={handleToggleCollaborator}
          onDelete={handleDeleteCollaborator}
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
