import { GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetPhysicalCustomerDTO extends GetNaturalPersonDTO {
  id?: string;
}
