import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdatePhysicalCustomerDTO {
  branch?: string;

  natural_person_id?: string;

  updated_by: string;

  NaturalPerson?: UpdateNaturalPersonDTO;
}
