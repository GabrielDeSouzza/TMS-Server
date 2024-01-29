import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateCarrierCompanyDTO {
  CarrierCompany: CarrierCompanyData;
  LegalPerson: UpdateLegalPersonDTO;
}

abstract class CarrierCompanyData {
  id?: string;

  updated_by: string;
  legalPersonId?: string;
}
