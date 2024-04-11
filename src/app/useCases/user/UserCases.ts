import { Injectable } from '@nestjs/common';

import { hashSync } from 'bcrypt';
import { GraphQLError } from 'graphql';

import { type getUserDto } from 'domain/dto/repositories/getDataDtos/GetUserDto';
import {
  type CountAllUserWhereRequestDTO,
  type FindAllUserWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/UserRepositoryDto';
import { User } from 'domain/entities/User/User';
import { UploaderProvider } from 'domain/providers/UploaderProvider';
import { UserRepository } from 'domain/repositories/UserRepository';
import { type FileUploadDTO } from 'domain/shared/dtos/FileUploadDto';

import { type CreateUserDto } from 'app/dtos/UsersDto/CreateUserDto';
import { type UpdateManyUsersDto } from 'app/dtos/UsersDto/UpdateManyUsersDto';
import { type UpdateUserDto } from 'app/dtos/UsersDto/UpdateUserDto';

@Injectable()
export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private uploaderProvider: UploaderProvider,
  ) {}

  async count(parameters: CountAllUserWhereRequestDTO): Promise<number> {
    return await this.userRepository.count(parameters);
  }

  async getAllUser(where: FindAllUserWhereRequestDTO): Promise<User[]> {
    return await this.userRepository.findAllUsers(where);
  }

  async getUser(search: getUserDto): Promise<User> {
    if (!search.id && !search.email) {
      throw new GraphQLError('Is necessary  to provide an ID or EMAIL');
    }

    const user = await this.userRepository.findUser({
      email: search.email,
      id: search.id,
      username: search.username,
    });
    if (user) return user;

    throw new GraphQLError('User not Found');
  }

  async createUser(
    newUser: CreateUserDto,
    avatar?: FileUploadDTO,
  ): Promise<User> {
    const userEntity = new User({ ...newUser });

    const result =
      avatar?.filename &&
      (await this.uploaderProvider.upload({
        file: avatar,
        folder: `users/${userEntity.id}/avatars`,
      }));

    userEntity.avatar_url = result?.path;
    userEntity.password = hashSync(newUser.password, 10);

    return this.userRepository.createUser(userEntity);
  }

  async updateUser(
    id: string,
    user: UpdateUserDto,
    avatar?: FileUploadDTO,
  ): Promise<User> {
    const currentUser = await this.userRepository.findUser({
      id,
    });

    if (!currentUser?.id) {
      throw new GraphQLError('User not Found');
    }

    const [result] = await Promise.all([
      avatar?.filename
        ? this.uploaderProvider.upload({
            file: avatar,
            folder: `users/${currentUser.id}/avatars`,
          })
        : null,
      avatar?.filename &&
        currentUser?.avatar_url &&
        this.uploaderProvider.delete({
          path: currentUser?.avatar_url,
          folder: `users/${currentUser.id}/avatars`,
        }),
    ]);

    const userEntity = new User({
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
      username: user.username,
      avatar_url: user.avatar_url,
    });

    if (user.password) {
      userEntity.password = hashSync(user.password, 10);
    }

    if (result?.path) {
      userEntity.password = result.path;
    }

    return this.userRepository.updateUser(id, userEntity);
  }

  async updateManyUsers(user: UpdateManyUsersDto[]): Promise<User[]> {
    const updateUsers = await this.userRepository.updateManyUsers(user);

    return updateUsers;
  }

  async deleteManyUsers(ids: string[]): Promise<User[]> {
    const deleteUsers = await this.userRepository.deleteManyUsers(ids);

    return deleteUsers;
  }
}
