export abstract class AuthResponseDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  role: 'USER' | 'ADMIN' | 'CLIENT';
  created_at: Date;
  updated_at: Date;
  token: string;
}
