export interface ISignInRequestDTO {
  email: string;
  password: string;
}

export interface ISignInResponseDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  role: 'USER' | 'ADMIN' | 'CLIENT';
  created_at: Date;
  updated_at: Date;
  token: string;
}
