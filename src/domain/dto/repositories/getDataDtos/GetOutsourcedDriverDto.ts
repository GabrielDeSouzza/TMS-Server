import { GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetOutsoucedDriverDTO extends GetNaturalPersonDTO {
  id?: string;
  cnh?: string;
}
