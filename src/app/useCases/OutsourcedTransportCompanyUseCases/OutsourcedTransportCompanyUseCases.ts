import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsourcedTransportCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompany';
import { OutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';
import { type CreateOutsourcedTransportCompanyDTO } from 'app/dtos/OutsourcedTransportCompany/CreateOutsourcedTransportCompanyDto';
import { type GetAllOutsourcedTransportCompanyDTO } from 'app/dtos/OutsourcedTransportCompany/GetAllOutsourcedTransportCompanyDto';
import { type UpdateOutsourcedTransportCompanyDTO } from 'app/dtos/OutsourcedTransportCompany/UpdateOutsourcedTransportCompanyDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';

@Injectable()
export class OutsourcedTransportCompanyUseCases {
  constructor(
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
    private legalPersonUseCases: LegalPersonUseCases,
  ) {}
  async getOutsourcedTransportCompany(
    request: GetOutsourcedTransportCompanyDTO,
  ) {
    if (
      !request.cnpj &&
      !request.corporateName &&
      !request.fantasyName &&
      !request.id &&
      !request.legalPersonId
    ) {
      throw new GraphQLError(
        'IS NECESSARY AN ID, CNPJ, FANTASY NAME OR CORPORATE NAME ',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    }

    return this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompany(
      request,
    );
  }
  async getAllOutsourcedTransportCompany(
    request: GetAllOutsourcedTransportCompanyDTO,
  ) {
    return this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompany(
      request,
    );
  }
  async createOutsourcedTransportCompany(
    data: CreateOutsourcedTransportCompanyDTO,
  ) {
    await this.legalPersonUseCases.validatePerson(data.LegalPerson);

    const legalPerson = LegalPersonEntityDto.createEntity(data.LegalPerson);
    const outsourcedTransportCompany = new OutsourcedTransportCompany({
      created_by: data.created_by,
      legalPersonId: data.legalPersonId,
      updated_by: data.updated_by,
    });

    return this.outsourcedTransportCompanyRepository.createOutsourcedTransportCompany(
      outsourcedTransportCompany,
      legalPerson,
      data.legalPersonId,
    );
  }
  async updateOutsourcedTransportCompany(
    id: string,
    data: UpdateOutsourcedTransportCompanyDTO,
  ) {
    if (
      data?.LegalPerson?.cnpj ||
      data?.LegalPerson?.state_registration ||
      data?.LegalPerson?.corporate_name ||
      data?.LegalPerson?.fantasy_name
    )
      await this.legalPersonUseCases.validatePerson(data.LegalPerson);

    const legalPerson = LegalPersonEntityDto.updateEntity(data.LegalPerson);
    const outsourcedTransportCompany = new OutsourcedTransportCompany({
      created_by: null,
      legalPersonId: data.legalPersonId,
      updated_by: data.updated_by,
    });

    return this.outsourcedTransportCompanyRepository.updateOutsourcedTransportCompany(
      id,
      outsourcedTransportCompany,
      legalPerson,
    );
  }

  async getAllContracts(id: string) {
    return this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyContracts(
      id,
    );
  }
  async getVehicles(id: string) {
    return this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyVehicles(
      id,
    );
  }

  async getDrivers(id: string) {
    return this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyDrivers(
      id,
    );
  }
}
