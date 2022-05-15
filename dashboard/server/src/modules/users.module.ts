import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'controllers/user.controller';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserSchema } from 'dataLayer/schemas/user.schema';
import { UserService } from 'services/user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UsersModule {}
