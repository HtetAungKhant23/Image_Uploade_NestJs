import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { FileSizeValidationPipe } from "./libs/FileInterceptor";
import { fileStorage } from "./helpers/file-storage";
import { Response } from "express";
import * as path from "path";

@Controller("image")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("add")
  @UseInterceptors(FilesInterceptor("image", 2, fileStorage))
  addImage(@UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>, @Res() res: Response) {
    console.log("hayahya");
    console.log(files[0].path);
    console.log(path.join(__dirname, ".././" + files[0].path));
    return this.appService.upload(files);
    // return files[0].path;
  }

  @Get(":id")
  async getImage(@Param("id") id: string, @Res() res: Response) {
    res.sendFile(path.join(__dirname, ".././uploads/" + id));
  }
}
