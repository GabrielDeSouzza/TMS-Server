import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateOutsourcedDriverDTO {
  outsourced_vehicle_id?: string;

  company_vehicle_id?: string;

  natural_person_id?: string;

  NaturalPerson: UpdateNaturalPersonDTO;

  cnh?: string;

  cnh_category?: string;

  cnh_expiration?: Date;

  course_mopp?: boolean;

  updated_by?: string;
}
