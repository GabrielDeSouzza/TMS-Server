import { HttpStatus, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { GraphQLError } from 'graphql';

import { type GetCarrierCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetCarrierCompanyDto';
import { CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';

import { type CreateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/CreateCarrierCompanyDto';
import { type FindAllCompaniesUseCaseRequestDTO } from 'app/dtos/CarrierCompanyDto/GetAllCarrierCompanyDto';
import { type UpdateCarrierCompanyDTO } from 'app/dtos/CarrierCompanyDto/UpdatedCarrierCompanyDto';
import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';

@Injectable()
export class CarrierCompanyUseCases {
  constructor(
    private carrierCompanyRepository: CarrierCompanyRepository,
    private legalPersonUseCase: LegalPersonUseCases,
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
    data: CreateCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    await this.legalPersonUseCase.validatePerson(data.LegalPerson);

    const carrierCompany = new CarrierCompany({
      created_by: data.CarrierCompany.created_by,
      legalPersonId: data.CarrierCompany.legalPersonId,
      updated_by: data.CarrierCompany.updated_by,
      id: randomUUID(),
    });
    const legalPerson = LegalPersonEntityDto.createEntity(data.LegalPerson);

    return this.carrierCompanyRepository.createCarrierCompany(
      carrierCompany,
      legalPerson,
      data.CarrierCompany.legalPersonId,
    );
  }
  async updateCarierCompany(
    id: string,
    request: UpdateCarrierCompanyDTO,
  ): Promise<CarrierCompany> {
    const carrierCompany = new CarrierCompany({
      updated_by: request.CarrierCompany.updated_by,
      created_by: null,
      legalPersonId: null,
    });
    const legalPerson = LegalPersonEntityDto.updateEntity(request.LegalPerson);

    return this.carrierCompanyRepository.updateCarrierCompany(
      id,
      carrierCompany,
      legalPerson,
    );
  }
}
