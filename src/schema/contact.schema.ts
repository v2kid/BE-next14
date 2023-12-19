import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type contactModel = HydratedDocument<Contact>;

@Schema()
export class Contact {
  
  @Prop()
  name : String
  @Prop()
  email : String
  @Prop()
  message : String
}

export const ContactSchema = SchemaFactory.createForClass(Contact);