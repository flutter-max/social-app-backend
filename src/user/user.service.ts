import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Relation } from './entities/releation.entity';
import { RelationDto } from './dtos/relation.dto';
import { Post } from 'src/post/entities/post.entity';
import { SearchUsersDto } from './dtos/search_users.dto';
import { CreateUserDto } from './dtos/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Relation.name) private readonly relationModel: Model<Relation>,
    @InjectModel(Relation.name) private readonly postModel: Model<Post>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      return [];
    }
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      blockedUsers: [],
    }).save();
    return newUser;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userModel.findOne({ phoneNumber: phoneNumber });
  }

  async getUserFollowers(id: string): Promise<User[]> {
    const docs: Relation[] = await this.relationModel
      .find({ following: id })
      .select('follower')
      .populate('follower');
    return docs.map((doc) => doc.follower as unknown as User);
  }

  async getUserFollowings(id: string): Promise<User[]> {
    const docs: Relation[] = await this.relationModel
      .find({ follower: id })
      .select('following')
      .populate('following');
    return docs.map((doc) => doc.following as unknown as User);
  }

  async followUser(relationDto: RelationDto) {
    const newRelation = new this.relationModel(relationDto);
    newRelation.save();
  }

  async unFollowUser(relationDto: RelationDto) {
    this.relationModel.findOneAndDelete(relationDto);
  }

  getTopUsers() {}

  async getSuggestedUsers(): Promise<User[]> {
    await this.postModel.aggregate([
      {
        $lookup: {
          from: User.name,
          localField: 'userId',
          foreignField: 'id',
          as: 'user',
        },
      },
      { $count: ' ' },
      {
        $sort: { count: 1 },
      },
      {
        $limit: 6,
      },
    ]);
    return [];
  }

  async searchUsers(searchUsersDto: SearchUsersDto): Promise<User[]> {
    let filter: any = {};
    if (searchUsersDto.query) {
      filter.fullName = {
        $regex: searchUsersDto.query,
        $options: 'i',
      };
    }
    if (searchUsersDto.country) {
      filter.country = searchUsersDto.country;
    }
    if (searchUsersDto.gender) {
      filter.gender = searchUsersDto.gender;
    }
    if (searchUsersDto.isPublic) {
      filter.isPublic = searchUsersDto.isPublic;
    }
    return await this.userModel.find({
      _id: { $ne: searchUsersDto.userId },
      ...filter,
    });
  }
}
