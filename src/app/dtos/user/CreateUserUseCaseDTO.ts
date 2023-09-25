export interface ICreateUserUseCaseRequestDTO {
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'CLIENT';
  username: string;
}
