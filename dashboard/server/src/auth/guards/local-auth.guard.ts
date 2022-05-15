import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Guards } from 'auth/common/guards';

@Injectable()
export class LocalAuthGuard extends AuthGuard(Guards.Local) {}
