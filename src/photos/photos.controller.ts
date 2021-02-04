import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import { BACKEND_API } from '../../server.configs'
import { editFileName } from '../util/file-upload'
@Controller('photos')
export class PhotosController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("photo", {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName
        })
    }))
    uploadSingle(@UploadedFile() file) {
        const imagePath = `http://${BACKEND_API}/photos/${file.filename}`
        return imagePath
    }

    @Post("uploads")
    @UseInterceptors(FilesInterceptor("photos[]", 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName
        })
    }))
    uploadMultiple(@UploadedFiles() files) {
        const filesPath = {
            titleImage: `http://${BACKEND_API}/photos/${files[0].filename}`,
            logo: `http://${BACKEND_API}/photos/${files[1].filename}`
        }
        return filesPath
    }

    @Get(":imagename")
    getImage(@Param('imagename') image, @Res() res) {
        const response = res.sendFile(image, { root: './uploads' });
        return {
            status: HttpStatus.OK,
            data: response,
        };
    }
}
