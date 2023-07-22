import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async upload(files: Array<Express.Multer.File>) {
    console.log(files);
    // const result = await cloudinary.uploader.upload(files[0].path);
    return files;
  }
}
