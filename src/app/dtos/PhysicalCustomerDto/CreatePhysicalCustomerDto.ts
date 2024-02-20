import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';

export abstract class CreatePhysicalCustomerDTO {
  branch?: string;

  natural_person_id?: string;

  created_by?: string;

  updated_by: string;

  NaturalPerson?: CreateNaturalPersonDTO;
}
