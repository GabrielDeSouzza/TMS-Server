import { type CarrierCompany } from 'domain/entities/legalPerson/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

export abstract class CarrierCompanyRepository {
  abstract findCarrierCompanyById(id: string): Promise<CarrierCompany>;
  abstract createCarrierCompany(
    carrierCompany: CarrierCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ): Promise<CarrierCompany>;
  abstract updateCarrierCompany(
    id: string,
    carrierCompany?: CarrierCompany,
    legalPerson?: LegalPerson,
  ): Promise<CarrierCompany>;
  abstract getAllCarrierCompany(): Promise<CarrierCompany[]>;
}
