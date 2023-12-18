import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type OutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';
import { type OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';
import { type OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';
import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';

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
  abstract getAllOutsourcedTransportCompanyContracts(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportCompanyContract[]>;
  abstract getAllOutsourcedTransportCompanyVehicles(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportVehicle[]>;
  abstract getAllOutsourcedTransportCompanyDrivers(
    outsourcedCompanyId: string,
  ): Promise<OutsourcedTransportCompanyDriver[]>;
}
