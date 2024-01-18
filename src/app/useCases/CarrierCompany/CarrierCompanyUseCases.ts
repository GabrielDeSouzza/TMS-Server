import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { type CreateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/CreateCarrierCompanyDto';
import { type FindAllCompaniesUseCaseRequestDTO } from 'app/dtos/CarrierCompanyDto/GetAllCarrierCompanyDto';
import { type GetCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/GetCarrierCompanyDto';
import { type UpdateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/UpdatedCarrierCompanyDto';

@Injectable()
export class CarrierCompanyUseCases {
  constructor(
    private carrierCompanyRepository: CarrierCompanyRepository,
    private legalPersonRepository: LegalPersonRepository,
  ) {}
  async getCarrierCompany(
    request: GetCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    const carrier = await this.carrierCompanyRepository.findCarrierCompanyById(
      request.id,
    );
    if (carrier) return carrier;

    throw new GraphQLError('Carrier Company not found');
  }

  async getAllCarrierCompany(
    request: FindAllCompaniesUseCaseRequestDTO,
  ): Promise<CarrierCompany[]> {
    const carries = await this.carrierCompanyRepository.getAllCarrierCompany({
      limit: request.limit,
      offset: request.offset,
      sort: request.sort,
      where: request.where,
    });

    return carries;
  }

  async createCarrierCompany(
    request: CreateCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    const carrierExist = await this.legalPersonRepository.ValideLegalPerson({
      cnpj: request.LegalPerson.cnpj,
      corporate_name: request.LegalPerson.corporate_name,
      fantasy_name: request.LegalPerson.fantasy_name,
      state_registration: request.LegalPerson.state_registration,
    });

    if (carrierExist) {
      let errors = '';

      if (carrierExist.cnpj == request.LegalPerson.cnpj) {
        errors += 'CNPJ IN USE;';
      }

      if (
        carrierExist.state_registration ==
        request.LegalPerson.state_registration
      ) {
        errors += 'STATE REGISTRATION IN USE;';
      }

      if (carrierExist.fantasy_name == request.LegalPerson.fantasy_name) {
        errors += ' FANTASY NAME IN USE';
      }

      if (carrierExist.corporate_name == request.LegalPerson.corporate_name) {
        errors += 'CORPORATE NAME IN USE';
      }

      if (errors.length > 0) {
        throw new GraphQLError(errors, {
          extensions: { code: HttpStatus.CONFLICT },
        });
      }
    }

    return this.carrierCompanyRepository.createCarrierCompany(
      request.CarrierCompany,
      request.LegalPerson,
      request.legalPersonId,
    );
  }
  async updateCarierCompany(
    request: UpdateCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    return this.carrierCompanyRepository.updateCarrierCompany(
      request.id,
      request.CarrierCompany,
      request.LegalPerson,
    );
  }
}
