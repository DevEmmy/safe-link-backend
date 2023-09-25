import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { Request } from "express";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import settings from "../constants/settings";
import { BadRequestError } from "../constants/errors";
import fs from "fs";

const multerConfig = {
  storage: multer.diskStorage({
    filename: (req: Request, file: Express.Multer.File, cb) => {
      let fileName: any = file.originalname;
      // add a uuid before the extension

      fileName = fileName.split(".");

      fileName[fileName.length - 2] = fileName[fileName.length - 2] + v4();

      fileName = fileName.join(".");

      cb(null, `${fileName}`);
    },

    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
  }),
};

export const multerUploader = multer(multerConfig);

// cloudinary config
cloudinary.config({
  api_key: settings.cloudinary.apiKey,
  api_secret: settings.cloudinary.apiSecret,
  cloud_name: settings.cloudinary.cloudName,
});

export const upload = async (
  filePath: string,
  options: UploadApiOptions = {}
) => {
  try {
    const uploadedFile = await cloudinary.uploader.upload(filePath, {
      folder: "CREAM CARD RESOURCES",
      ...options,
    });

    await fs.unlink(filePath, () => {});

    return uploadedFile.url;
  } catch (error: any) {
    throw new BadRequestError(error);
  }
};