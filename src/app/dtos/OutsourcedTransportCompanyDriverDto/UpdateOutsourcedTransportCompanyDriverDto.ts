import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateOutsourcedTransportCompanyDriverDTO {
  cnh?: string;

  cnh_category?: string;

  cnh_expiration?: Date;

  course_mopp?: boolean;

  outsourced_transport_company_id?: string;

  updated_by?: string;

  NaturalPerson?: UpdateNaturalPersonDTO;
}
