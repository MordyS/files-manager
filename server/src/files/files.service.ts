import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    getFilesList(): Array<string> {
        return fs.readdirSync('./my-files/');
    }

    getFile(filename: string): StreamableFile {
        const file = fs.createReadStream(`./my-files/${filename}`);
        return new StreamableFile(file);
    }
}
