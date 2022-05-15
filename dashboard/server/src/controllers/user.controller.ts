import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { Public } from 'auth/decorator/jwt.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import RoleGuard from 'auth/guards/roles.guard';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from 'services/dto/user.dto';
import User from 'dataLayer/entities/user.entity';
import { Role } from 'dataLayer/schemas/enums/role.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userRepository: UserRepository, private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() request) {
        return request.user;
    }

    @Get()
    @UseGuards(RoleGuard(Role.Admin))
    findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    @Public()
    @Get(':id')
    findId(@Param('id') id): Promise<User> {
        return this.userRepository.findId(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.delete(id);
    }

    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}
