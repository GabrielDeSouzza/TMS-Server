import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateManyOwnDriversDto {
  id: string;
  cnh?: string;
  cnh_category?: string;
  cnh_expiration?: Date;
  company_vehicle?: boolean;
  course_mopp?: boolean;
  NaturalPerson?: UpdateNaturalPersonDTO;
  updated_by?: string;
}
