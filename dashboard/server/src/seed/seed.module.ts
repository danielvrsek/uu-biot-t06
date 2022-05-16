import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from 'services/user.service';
import console from 'console';

@Injectable()
export class SeedService {
    constructor(private readonly userService: UserService) {}

    @Command({ command: 'seed', describe: 'Seed data' })
    async create() {
        console.log(
            await this.userService.createAsync({
                firstName: 'Test',
                lastname: 'User',
                email: 'user@user.com',
                username: 'user',
                passwordRaw: 'user',
            })
        );
    }
}
