import { Controller, Post, Get, UseInterceptors, UploadedFile, FileTypeValidator, ParseFilePipe, ParseFilePipeBuilder, HttpException, HttpStatus, Param, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { MulterError, diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('files')
export class FilesController {

    constructor(private filesservice: FilesService) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(pdf|doc.*)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf, doc'), false);
            }
        },
        storage: diskStorage({
            destination: './my-files/',
            filename: (req, file, cb) => {
                let name = file.originalname;
                if (fs.existsSync(`./my-files/${name}`)) {
                    let i = 0;
                    do name = `${addNumberToFile(file.originalname, ++i)}`
                    while (fs.existsSync(`./my-files/${addNumberToFile(file.originalname, i)}`))
                }

                name = Buffer.from(name, "latin1").toString('utf8')
                cb(null, name)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        return { filename: file.filename }
    }
    
    @Get()
    getFilesList(): Array<string> {
        return this.filesservice.getFilesList()
    }

    @Get(':filename')
    getFile(@Param('filename') filename: string):StreamableFile  {
        return this.filesservice.getFile(filename)
    }
}

function addNumberToFile(filename: string, number: number) {
    let arr = filename.split('.');
    arr[arr.length - 2] += `(${number})`;
    return arr.join('.');
}

