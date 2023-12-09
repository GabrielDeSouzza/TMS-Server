import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';
import { type OutsourcedTransportCompany } from 'domain/entities/legalPerson/outsourcedTransportCompany/OutsourcedTransportCompany';

export abstract class OutsourcedTransportCompanyRepository {
  abstract findOutsourcedTransportCompanyById(
    id: string,
  ): Promise<OutsourcedTransportCompany>;
  abstract createOutsourcedTransportCompany(
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ): Promise<OutsourcedTransportCompany>;
  abstract updateOutsourcedTransportCompany(
    id: string,
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson: LegalPerson,
  ): Promise<OutsourcedTransportCompany>;
  abstract getAllOutsourcedTransportCompany(): Promise<
    OutsourcedTransportCompany[]
  >;
}
