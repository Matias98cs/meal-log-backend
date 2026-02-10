import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
import type{ Response } from 'express';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { fileFilter } from './helpers/fileFilter.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('meal/:imageName')
  findMealImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticMealImage(imageName);
    return res.status(200).sendFile(path);

  }

  @Post('meal')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/meals',
      filename: fileNamer,
    }),
  }))
  uploadMealImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is uploaded');
    }

    const HOST_API = this.configService.get('HOST_API') || '';

    if (!HOST_API) {
      throw new BadRequestException('HOST_API is not defined');
    }
    const secureUrl = `${HOST_API}/files/meal/${file.filename}`;

    return {
      secureUrl
    }
  }
}
