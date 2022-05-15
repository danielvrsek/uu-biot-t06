import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'controllers/user.controller';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { UserSchema } from 'dataLayer/entities/user.entity';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { UserService } from 'services/user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: SchemaConstants.User, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserRepository, UserService],
})
export class UserModule {}
