import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('not found user');
    }

    return user;
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    this.usersService.update(parseInt(id), body);
  }
}
