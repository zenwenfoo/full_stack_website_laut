import multer from "multer";
import path from "path";
import fs from "fs";

const AVATAR_DIR = path.join(process.cwd(), "uploads", "avatars");
fs.mkdirSync(AVATAR_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png","image/jpeg","image/jpg","image/webp"].includes(file.mimetype);
    cb(ok ? null : new Error("Only PNG/JPEG/WEBP allowed"), ok);
  },
});
