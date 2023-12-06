import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userModel = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: String;
  @Prop()
  name : String;
  @Prop()
  password : String;
  @Prop()
  roles : [];

}

export const UserSchema = SchemaFactory.createForClass(User);