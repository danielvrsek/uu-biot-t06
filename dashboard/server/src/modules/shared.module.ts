import { Module } from '@nestjs/common';
import { CookieHelper } from 'utils/cookieHelper';
import { CryptoHelper } from 'utils/cryptoHelper';

@Module({
    providers: [CookieHelper, CryptoHelper],
    exports: [CookieHelper, CryptoHelper],
})
export class SharedModule {}
