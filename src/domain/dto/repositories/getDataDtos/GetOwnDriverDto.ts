import { GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetOwnDriverDTO extends GetNaturalPersonDTO {
  id?: string;
  cnh?: string;
}
