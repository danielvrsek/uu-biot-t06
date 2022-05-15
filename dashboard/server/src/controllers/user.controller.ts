import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { Public } from 'auth/decorator/jwt.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import RoleGuard from 'auth/guards/roles.guard';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from 'services/dto/user.dto';
import { User } from 'dataLayer/entities/user.entity';
import { Role } from 'dataLayer/entities/enums/role.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userRepository: UserRepository, private readonly userService: UserService) {}

    @Get('profile')
    getProfile(@Req() request) {
        return request.user;
    }

    @Get()
    @UseGuards(RoleGuard(Role.Admin))
    findAll(): Promise<User[]> {
        return this.userRepository.findAllAsync();
    }

    @Get(':id')
    findByIdAsync(@Param('id') id): Promise<User> {
        return this.userRepository.findByIdAsync(id);
    }

    @Post()
    createAsync(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createAsync(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.deleteAsync(id);
    }

    @Put(':id')
    updateAsync(@Body() updateUserDto: UpdateUserDto, @Param('id') id): Promise<User> {
        return this.userService.updateAsync(id, updateUserDto);
    }
}
