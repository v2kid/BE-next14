import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type productModel = HydratedDocument<Product>;

@Schema()
export class Product {
  
  @Prop()
  title : String
  @Prop()
  gender : String
  @Prop()
  category : String
  @Prop()
  description : String
  @Prop()
  price : Number
  @Prop()
  weight : Number
  @Prop()
  image : []
}

export const ProductSchema = SchemaFactory.createForClass(Product);