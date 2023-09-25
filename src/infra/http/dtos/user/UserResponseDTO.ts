export abstract class UserResponseDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'CLIENT';
  created_at: Date;
  updated_at: Date;
}
