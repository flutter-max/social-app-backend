import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response } from 'express';
import { CreateCommentDto } from './dtos/create_comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getAllPosts(
    @Res() res: Response,
    @Param() postId: string,
  ): Promise<void> {
    try {
      const posts = await this.commentService.getPostComments(postId);
      res.status(HttpStatus.OK).json({ message: 'success', body: posts });
    } catch (err) {
      res.status(err.status).json(err.response);
    }
  }

  @Post()
  async createPost(
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<object> {
    try {
      await this.commentService.createComment(createCommentDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'success', body: 'Comment created successfully' });
    } catch (_) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'failed',
      });
    }
  }
}
