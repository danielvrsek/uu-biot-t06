import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HttpHelper {
    getServerUrl(req: Request) {
        return `${req.protocol}://${req.get('host')}`;
    }
}
