export abstract class CreateUserDto {
  name: string;
  role: string;
  email: string;
  password: string;
  username: string;
  avatar_url?: string;
}
