import { type ROLE } from 'domain/entities/user/User';

export interface ISignInRequestDTO {
  email: string;
  password: string;
}

export interface ISignInResponseDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  role: ROLE;
  created_at: Date;
  updated_at: Date;
  token: string;
}
