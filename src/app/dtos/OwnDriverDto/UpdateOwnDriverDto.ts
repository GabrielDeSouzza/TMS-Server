import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateOwnDriverDTO {
  cnh?: string;

  cnh_category?: string;

  cnh_expiration?: Date;

  company_vehicle?: boolean;

  course_mopp?: boolean;

  NaturalPerson?: UpdateNaturalPersonDTO;

  updated_by?: string;

  natural_person_id?: string;
}
