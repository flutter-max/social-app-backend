import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({ versionKey: false })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  cookTime: string;

  @Prop()
  serves: string;

  @Prop()
  ingredients: string[][];

  @Prop()
  instructions: string[][];

  @Prop()
  courses: string[];

  @Prop()
  fields: string[];

  @Prop()
  types: string[];

  @Prop()
  difficulty: string;

  @Prop()
  commentsCount: number;

  @Prop()
  likes: string[];

  @Prop()
  saved: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
