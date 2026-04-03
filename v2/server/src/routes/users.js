import { Router } from "express";
import authRequired from "../middleware/authRequired.js";
import { avatarUpload } from "../utils/upload.js"
import {getMe, updateMe, changePassword } from "../controllers/userController.js";

const router = Router();
router.get("/me", authRequired, getMe);
router.put("/me", authRequired, avatarUpload.single("avatar"), updateMe);
router.put("/me/password", authRequired, changePassword);

export default router;