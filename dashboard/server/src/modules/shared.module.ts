import { Module } from '@nestjs/common';
import { CookieHelper } from 'common/cookieHelper';

@Module({
    providers: [CookieHelper],
    exports: [CookieHelper],
})
export class SharedModule {}
