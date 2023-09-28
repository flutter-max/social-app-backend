import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create_post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { SearchPostsDto } from './dtos/search_posts.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postModel.find();
    if (!posts) {
      return [];
    }
    return posts;
  }

  async getPostsById(id: string): Promise<Post[]> {
    console.log(id);
    const posts = await this.postModel.find({ userId: id });
    if (!posts) {
      return [];
    }
    return posts;
  }

  async createPost(createPostDto: CreatePostDto): Promise<void> {
    const newPost = new this.postModel(createPostDto);
    newPost.save();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId);
  }

  async likePost(postId: string, userId: String): Promise<void> {
    await this.postModel.findByIdAndUpdate(postId, {
      $push: {
        likes: userId,
      },
    });
  }

  async unLikePost(postId: string, userId: String): Promise<void> {
    await this.postModel.findByIdAndUpdate(postId, {
      $pop: {
        likes: userId,
      },
    });
  }

  async IncCommentsCount(postId: string): Promise<void> {
    this.postModel.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });
  }

  async searchPosts(searchPostsDto: SearchPostsDto): Promise<User[]> {
    let filter: any = {};
    if (searchPostsDto.query) {
      filter.title = {
        $regex: searchPostsDto.query,
        $options: 'i',
      };
    }
    if (searchPostsDto.fields) {
      filter.fields = searchPostsDto.fields;
    }
    if (searchPostsDto.courses) {
      filter.courses = searchPostsDto.courses;
    }
    if (searchPostsDto.difficulty) {
      filter.difficulty = searchPostsDto.difficulty;
    }
    return await this.postModel.find({
      userId: { $ne: searchPostsDto.userId },
      ...filter,
    });
  }
}
