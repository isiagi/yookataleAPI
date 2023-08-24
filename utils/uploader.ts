import { Request, Response } from "express";
import cloudinary from "./Cloudinary";

const uploader = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const imageUrl = await cloudinary.uploader.upload(req.file.path);

  return imageUrl.secure_url;
};

export default uploader;
