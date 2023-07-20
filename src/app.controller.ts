import { Controller, Get, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileSizeValidationPipe } from "./libs/FileInterceptor";
import { Response } from "express";

@Controller("image")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("add")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  addImage(@UploadedFile(new FileSizeValidationPipe()) file: Array<Express.Multer.File>, @Res() res: Response) {
    console.log(file);
    return "File upload API";
  }

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files"))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return "good job bitch";
  }
}
