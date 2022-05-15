import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'dataLayer/entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly model: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.model.find();
    }

    async findId(id: string): Promise<User> {
        const user = await this.model.findById(id);
        if (user) {
            return user;
        }
        throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND);
    }

    async findOne(email: string): Promise<User> {
        const user = await this.model.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException('User with this mail does not exist', HttpStatus.NOT_FOUND);
    }
}
