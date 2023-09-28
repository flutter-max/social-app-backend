import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import mongoose from 'mongoose';

@Schema()
export class Relation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  follower: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  following: string;
}

export const RelationSchema = SchemaFactory.createForClass(Relation);
