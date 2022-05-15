import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'utils/bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import User from 'dataLayer/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly model: Model<User>) {}

    async create(user: CreateUserDto): Promise<User> {
        const passwordHash = encodePassword(user.passwordRaw);
        const newUser = new this.model({
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
            passwordHash,
        });
        return await newUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.model.findByIdAndRemove(id);
    }

    async update(id: string, user: UpdateUserDto): Promise<User> {
        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }
}
