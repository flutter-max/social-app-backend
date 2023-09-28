import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dtos/create_comment.dto';
import { Comment } from 'src/comment/entities/comment.entity';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly postService: PostService,
  ) {}

  async getPostComments(postId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ postId: postId });
    if (!comments) {
      return [];
    }
    return comments;
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<void> {
    new this.commentModel({ createCommentDto }).save();
    this.postService.IncCommentsCount(createCommentDto.postId);
  }
}
