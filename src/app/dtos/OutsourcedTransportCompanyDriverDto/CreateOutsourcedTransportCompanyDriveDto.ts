import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';
export abstract class CreateOutsourcedTransportCompanyDriverDTO {
  natural_person_id?: string;

  cnh: string;

  cnh_category: string;

  cnh_expiration: Date;

  course_mopp: boolean;

  outsourced_transport_company_id: string;

  updated_by: string;

  NaturalPerson?: CreateNaturalPersonDTO;

  created_by: string;
}
