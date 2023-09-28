import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from './dtos/create_post.dto';
import { PostService } from './post.service';
import { SearchPostsDto } from './dtos/search_posts.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(@Res() res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(HttpStatus.OK).json({ message: 'success', body: posts });
    } catch (err) {
      res.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async getPostsById(
    @Res() res: Response,
    @Param('id') userId: string,
  ): Promise<void> {
    try {
      const posts = await this.postService.getPostsById(userId);
      res.status(HttpStatus.OK).json({ message: 'success', body: posts });
    } catch (err) {
      res.status(err.status).json(err.response);
    }
  }

  @Get('search')
  async searchUsers(
    @Query() searchPostsDto: SearchPostsDto,
  ): Promise<object[]> {
    return this.postService.searchPosts(searchPostsDto);
  }

  @Post()
  async createPost(
    @Res() res: Response,
    @Body() createPostDto: CreatePostDto,
  ): Promise<object> {
    try {
      await this.postService.createPost(createPostDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'success', body: 'Post created successfully' });
    } catch (_) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'failed',
      });
    }
  }

  @Delete(':id')
  async deletePost(
    @Res() res: Response,
    @Param('id') postId: string,
  ): Promise<object> {
    try {
      await this.postService.deletePost(postId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'success', body: 'Post deleted successfully' });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  
  @Post('like/:id')
  async likePost(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') postId: string,
  ): Promise<object> {
    try {
      await this.postService.likePost(postId, '5');
      return res.status(HttpStatus.OK).json({ message: 'success', body: '' });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

 
  @Post('unlike/:id')
  async unLikePost(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') postId: string,
  ): Promise<object> {
    try {
      await this.postService.unLikePost(postId, '5');
      return res.status(HttpStatus.OK).json({ message: 'success', body: '' });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
