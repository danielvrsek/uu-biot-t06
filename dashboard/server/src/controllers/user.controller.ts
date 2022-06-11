import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import RoleGuard from 'auth/guards/roles.guard';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserDto } from 'services/dto/user.dto';
import { User } from 'dataLayer/entities/user.entity';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { EnforceTokenType } from 'auth/decorator/tokenType.decorator';
import { TokenType } from 'auth/common/tokenType';
import { TokenTypeGuard } from 'auth/guards/tokenType.guard';
import { UserRequest } from 'common/request';

@Controller('users')
@EnforceTokenType(TokenType.User)
@UseGuards(JwtAuthGuard, TokenTypeGuard)
export class UserController {
    constructor(private readonly userRepository: UserRepository, private readonly userService: UserService) {}

    @Get()
    async findAllAsync(): Promise<UserDto[]> {
        const data = await this.userRepository.findAllAsync();
        return data.map((x) => ({
            userId: x._id.toString(),
            firstName: x.firstName,
            lastname: x.lastname,
            email: x.email,
            username: x.username,
        }));
    }

    @Get('profile')
    getProfile(@Req() request: UserRequest<void>) {
        return request.user;
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
    updateAsync(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateAsync(id, updateUserDto);
    }
}
