import { Controller, Get, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { FileSizeValidationPipe } from "./libs/FileInterceptor";
import { fileStorage } from "./helpers/file-storage";

@Controller("image")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("add")
  @UseInterceptors(FilesInterceptor("image", 2, fileStorage))
  addImage(@UploadedFiles(new FileSizeValidationPipe()) files: Array<Express.Multer.File>) {
    console.log("hayahya");
    return this.appService.upload(files);
  }

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files"))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return "good job bitch";
  }
}
