import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AssetService {
    saveProfilePhoto(filename: string, stream: fs.ReadStream) {
        const folder = 'profile-photos/';
        const path = 'public/' + folder + filename;
        stream.pipe(fs.createWriteStream(path));
        return '/' + folder + filename;
    }
}
