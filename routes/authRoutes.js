const { Router } = require("express");
const authControllers = require("../controllers/authControllers");

const router = Router();

router.get("/login", authControllers.loginGet);
router.post("/login", authControllers.loginPost);
router.get("/signup", authControllers.signUpGet);
router.post("/signup", authControllers.signUpPost);
router.get("/logout", authControllers.logoutGet);

module.exports = router;
