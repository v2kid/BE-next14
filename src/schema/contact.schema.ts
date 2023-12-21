import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument ,now} from 'mongoose';

export type contactModel = HydratedDocument<Contact>;

@Schema()
export class Contact {
  
  @Prop()
  name : String
  @Prop()
  email : String
  @Prop()
  message : String
  @Prop()
  status : String
  @Prop({default: now()})
  createdAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);