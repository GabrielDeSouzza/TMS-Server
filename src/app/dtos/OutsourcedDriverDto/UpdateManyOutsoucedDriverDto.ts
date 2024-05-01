import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateManyOutsourcedDriverDTO {
  id: string;

  outsourced_vehicle_id?: string;

  company_vehicle_id?: string;

  NaturalPerson?: UpdateNaturalPersonDTO;

  cnh?: string;

  cnh_category?: string;

  cnh_expiration?: Date;

  course_mopp?: boolean;
}
