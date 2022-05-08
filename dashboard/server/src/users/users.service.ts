import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findId(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this ID does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this mail does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const password = encodePassword(user.password);
    const newUser = new this.userModel({ ...user, password });
    return await newUser.save();
  }
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
