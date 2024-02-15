import { GetNaturalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetNaturalPersonDto';

export abstract class GetOwnDriverDTO extends GetNaturalPersonDTO {
  id?: string;
  cnh?: string;
}
