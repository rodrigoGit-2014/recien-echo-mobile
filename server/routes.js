import { Router } from "express";
import { AuthError } from "./errors.js";
import { resetDatabase } from "./db.js";
import * as authService from "./authService.js";
import * as businessService from "./businessService.js";

export const router = Router();

function handle(fn) {
  return async (req, res) => {
    try {
      const body = await fn(req, res);
      res.json(body);
    } catch (err) {
      if (err instanceof AuthError) {
        res.status(err.status).json({ code: err.code, message: err.message });
        return;
      }
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json({ code: "INTERNAL_ERROR", message: "Ocurrió un error inesperado." });
    }
  };
}

router.post(
  "/auth/register",
  handle(async (req) => authService.registerUser(req.body))
);

router.post(
  "/auth/login",
  handle(async (req) => authService.loginUser(req.body))
);

router.post(
  "/auth/verify",
  handle(async (req) => authService.verifyEmailCode(req.body.email, req.body.code))
);

router.post(
  "/auth/resend-verification",
  handle(async (req) => authService.resendVerificationCode(req.body.email))
);

router.post(
  "/auth/request-password-reset",
  handle(async (req) => authService.requestPasswordReset(req.body.email))
);

router.post(
  "/auth/reset-password",
  handle(async (req) =>
    authService.resetPassword(req.body.email, req.body.code, req.body.newPassword)
  )
);

// ─── Negocio ───────────────────────────────────────────────────────────────

router.post(
  "/business",
  handle(async (req) => businessService.saveBusiness(req.body))
);

router.get(
  "/business/:email",
  handle(async (req) => businessService.getBusinessByEmail(req.params.email))
);

// Solo para desarrollo: limpia la base de datos en memoria del servidor.
router.post(
  "/dev/reset",
  handle(async () => {
    resetDatabase();
    return { ok: true };
  })
);
