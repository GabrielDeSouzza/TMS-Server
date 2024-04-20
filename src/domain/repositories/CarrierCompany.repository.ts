import {
  type CountAllCarrierCompaniesWhereRequestDTO,
  type UpdateManyCarrierCompaniesDTO,
  type getCarrierCompanyData,
  type FindAllWhereCarrierCompanyRequestType,
} from 'domain/dto/repositories/whereDtos/CarrierRepositoryDto';
import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class CarrierCompanyRepository {
  abstract count(
    parameters: CountAllCarrierCompaniesWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<CarrierCompany>;
  abstract updateManyCarriersCompanies(
    user: UpdateManyCarrierCompaniesDTO[],
  ): Promise<CarrierCompany[]>;
  abstract deleteManyCarriersCompanies(
    ids: string[],
  ): Promise<CarrierCompany[]>;
  abstract findCarrierCompany(
    data: getCarrierCompanyData,
  ): Promise<CarrierCompany>;
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
  abstract getAllCarrierCompany(
    where: FindAllWhereCarrierCompanyRequestType,
  ): Promise<CarrierCompany[]>;
}
