import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';

export abstract class CreateOwnDriverDTO {
  cnh: string;

  cnh_category: string;

  cnh_expiration: Date;

  company_vehicle: boolean;

  course_mopp: boolean;

  NaturalPerson?: CreateNaturalPersonDTO;

  created_by: string;

  updated_by: string;

  natural_person_id?: string;
}
