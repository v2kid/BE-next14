import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { productModel } from 'src/schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<productModel>,
  ) {}
  public async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  async findAll(keyword : string, category : string, gender : string = null, page: number, perpage : number) {
    // const data = await this.productModel.find().exec();
    // return data;
    if(category==='All'){
      category = ''
    }
    if(gender==='unisex'){
      gender = ''
    }
    const data = await this.productModel.find({
      gender : new RegExp (gender as string ,'i'),
      category : new RegExp (category as string ,'i'),
      title :  new RegExp (keyword as string , 'i')
    })
    .skip((page-1)*perpage)
    .limit(perpage as number)
    .exec()
    return data;
  }

  async findOne(id: string) {
    const data = await this.productModel.findOne({
       _id: id 
    })
    return data
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const data = await this.productModel.findOneAndUpdate({
   _id:id
   },updateProductDto).exec()
   return  data
  }

  async delete(id: string) {
    const data = await this.productModel.deleteOne({
      _id: id
    })
    return data
  }
}
