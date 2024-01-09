import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const name = uuid() + path.extname(file.originalname);
    cb(null, name);
  },
});

export const upload = multer({ storage: storage });
