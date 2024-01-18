import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class CreateCarrierCompanyDTO {
  CarrierCompany: CarrierCompany;

  LegalPerson?: LegalPerson;
  legalPersonId?: string;
}
