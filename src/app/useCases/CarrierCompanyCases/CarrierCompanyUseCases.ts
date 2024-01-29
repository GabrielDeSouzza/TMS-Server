import { HttpStatus, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { GraphQLError } from 'graphql';

import { CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { type CreateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/CreateCarrierCompanyDto';
import { type FindAllCompaniesUseCaseRequestDTO } from 'app/dtos/CarrierCompanyDto/GetAllCarrierCompanyDto';
import { type GetCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/GetCarrierCompanyDto';
import { type UpdateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/UpdatedCarrierCompanyDto';
import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/EntityDto';

@Injectable()
export class CarrierCompanyUseCases {
  constructor(
    private carrierCompanyRepository: CarrierCompanyRepository,
    private legalPersonRepository: LegalPersonRepository,
  ) {}
  async getCarrierCompany(
    request: GetCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    if (!request) {
      throw new GraphQLError(
        'IS NECESSARY AN ID, CNPJ, FANTASY NAME OR CORPORATE NAME ',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    }

    const carrier = await this.carrierCompanyRepository.findCarrierCompany(
      request,
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
    const legalPersonExist = await this.legalPersonRepository.ValideLegalPerson(
      {
        cnpj: request.LegalPerson.cnpj,
        corporate_name: request.LegalPerson.corporate_name,
        fantasy_name: request.LegalPerson.fantasy_name,
        state_registration: request.LegalPerson.state_registration,
      },
    );

    if (legalPersonExist) {
      let errors = '';

      if (legalPersonExist.cnpj == request.LegalPerson.cnpj) {
        errors += 'CNPJ IN USE;';
      }

      if (
        legalPersonExist.state_registration ==
        request.LegalPerson.state_registration
      ) {
        errors += 'STATE REGISTRATION IN USE;';
      }

      if (legalPersonExist.fantasy_name == request.LegalPerson.fantasy_name) {
        errors += ' FANTASY NAME IN USE';
      }

      if (
        legalPersonExist.corporate_name == request.LegalPerson.corporate_name
      ) {
        errors += 'CORPORATE NAME IN USE';
      }

      if (errors.length > 0) {
        throw new GraphQLError(errors, {
          extensions: { code: HttpStatus.CONFLICT },
        });
      }
    }

    const carrierCompany = new CarrierCompany({
      created_by: request.CarrierCompany.created_by,
      legalPersonId: request.CarrierCompany.legalPersonId,
      updated_by: request.CarrierCompany.updated_by,
      id: randomUUID(),
    });
    const legalPerson = LegalPersonEntityDto.createEntity(request.LegalPerson);

    return this.carrierCompanyRepository.createCarrierCompany(
      carrierCompany,
      legalPerson,
      request.CarrierCompany.legalPersonId,
    );
  }
  async updateCarierCompany(
    id: string,
    request: UpdateCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    const carrierCompany = new CarrierCompany({
      updated_by: request.CarrierCompany.updated_by,
      created_by: '',
      legalPersonId: '',
    });
    const legalPerson = LegalPersonEntityDto.updateEntity(request.LegalPerson);

    return this.carrierCompanyRepository.updateCarrierCompany(
      id,
      carrierCompany,
      legalPerson,
    );
  }
}
