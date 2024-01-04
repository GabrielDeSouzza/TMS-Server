export interface ISignInRequestDTO {
  email: string;
  password: string;
}

export interface ISignInResponseDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  token: string;
}
