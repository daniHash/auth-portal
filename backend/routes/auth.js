const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/auth");

router.get("/login/success", authController.loginSuccess);
router.get("/login/failed", authController.loginFailed);
router.get("/logout", authController.logout);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/auth/login/failed",
    }),
);

module.exports = router;
