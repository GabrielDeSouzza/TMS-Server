import {
  type ISignInRequestDTO,
  type ISignInResponseDTO,
} from './AuthDTO/AuthRepositoryDto';

export abstract class AuthRepository {
  abstract signIn(credentials: ISignInRequestDTO): Promise<ISignInResponseDTO>;
}
