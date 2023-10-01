import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  phoneNumber: string;

  @Prop()
  country: string;

  @Prop()
  userName: string;

  @Prop()
  fullName: string;

  @Prop()
  gender: string;

  @Prop()
  birthDate: string;

  @Prop({ default: null })
  userAvatar: string;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop()
  cuisinesPreferences: string[];

  @Prop()
  dietaryPreferences: string[];

  @Prop()
  blockedUsers: string[];

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
