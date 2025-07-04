import multer from "multer";
import { promises as fs } from "fs";
import path from "path";
import config from "../config";
import { randomUUID } from "node:crypto";

export const cocktailImage = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const destDir = path.join(config.publicPath, "cocktails");
      await fs.mkdir(destDir, { recursive: true });
      cb(null, destDir);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, randomUUID() + extension);
    },
  }),
});

export const userImage = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const destDir = path.join(config.publicPath, "users");
      await fs.mkdir(destDir, { recursive: true });
      cb(null, destDir);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, randomUUID() + extension);
    },
  }),
});
