import {
  type ISignInRequestDTO,
  type ISignInResponseDTO,
} from 'domain/dtos/repositories/AuthRepositoryDTO';

export abstract class AuthRepository {
  abstract signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO>;
}
