import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({versionKey: false,timestamps: true})
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  postId: string;

  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
