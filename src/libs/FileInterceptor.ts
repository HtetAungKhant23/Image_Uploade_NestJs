import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      if (value.size > 10 * 1024 * 1024) {
        throw new HttpException(
          {
            devMessage: "file-size-exceted!",
            message: "File cannot uploaded",
          },
          404,
        );
      } else {
        return value;
      }
    }
  }
}
