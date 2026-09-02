import { Router } from "express";
import { getMe, login, register, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect ,getMe)
router.put("/update-profile", protect, updateProfile);

export default router;