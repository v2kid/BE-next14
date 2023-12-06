import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userModel } from 'src/schema/user.schema';
@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(@InjectModel('User') private userModel: Model<userModel>) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    console.log(user);

    return user;
  }

  async findAll(keyword : string) {
    const data = await this.userModel.find({
      name :  new RegExp (keyword as string)
    }).exec()
    return data;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById({
      _id : id
    })
    console.log(user)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.findByIdAndUpdate({
      _id:id 
    },updateUserDto).exec()
    return result
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({_id:id})
  }

  async findbyemail(email : string): Promise<User>{
    const user = await  this.userModel.findOne({email})
      return user
  }


}
