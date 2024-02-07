import { GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetOutsourcedTransportCompanyDriverDTO extends GetNaturalPersonDTO {
  id?: string;
  cnh?: string;
}
