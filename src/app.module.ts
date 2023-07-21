import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryProvider } from "./photo.provider";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
