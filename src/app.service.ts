import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  upload(files: Array<Express.Multer.File>) {
    console.log(files);
    return "File uploaded successfully";
  }
}
