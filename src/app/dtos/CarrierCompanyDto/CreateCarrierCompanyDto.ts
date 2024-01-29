import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';

export abstract class CreateCarrierCompanyDTO {
  CarrierCompany: CarrierCompanyData;
  LegalPerson: CreateLegalPersonDTO;
}

abstract class CarrierCompanyData {
  id?: string;

  updated_by: string;
  created_by: string;
  legalPersonId?: string;
}
