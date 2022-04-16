import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Role } from './interfaces/role.enum';
import RoleGuard from './guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  findAll(): Promise<User[]> {
    return this.usersServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.usersServices.findOne(id);
  }

  @Post()
  //@Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersServices.create(createUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersServices.delete(id);
  }

  @Put(':id')
  update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.usersServices.update(id, updateUserDto);
  }
}
