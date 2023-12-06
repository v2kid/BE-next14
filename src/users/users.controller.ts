import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';

@Controller('users')
@UseGuards(RolesGuard)

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('list')
  findAll(@Query('keyword') keyword : string) {
    return this.usersService.findAll(keyword);
  }

  @Get('id')
  findOne(@Query('id')  id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  remove(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
