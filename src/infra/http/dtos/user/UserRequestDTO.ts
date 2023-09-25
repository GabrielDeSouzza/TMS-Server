export abstract class UserRequestDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'CLIENT';
}
