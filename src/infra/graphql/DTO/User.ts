import { User } from 'domain/entities/User/User';

import {
  type UserInput,
  type UserUpdateInput,
} from '../entities/UserGraphql/user.input';

export class UserGraphDTO {
  public static createInputToEntity(createInput: UserInput) {
    return new User({
      name: createInput.name,
      username: createInput.username,
      email: createInput.email,
      password: createInput.password,
      role: createInput.role,
    });
  }

  public static updateInputToEntity(updateInput: UserUpdateInput | undefined) {
    return updateInput
      ? new User({
          name: updateInput.name,
          username: updateInput.username,
          email: updateInput.email,
          password: updateInput.password,
          role: updateInput.role,
        })
      : undefined;
  }
}
