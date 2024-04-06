import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import { type FindAllMaintenanceCompanyWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';
import { MaintenanceCompanyRepository } from 'domain/repositories/MaintenanceCompanyRepositoy';

import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';
import { type CreateMaintenanceCompanyDTO } from 'app/dtos/MaintenanceCompanyDto/CreateMaintenanceCompanyDto';
import { type UpdateMaintenanceCompanyDTO } from 'app/dtos/MaintenanceCompanyDto/UpdateMaintenanceCompanyDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';

@Injectable()
export class MaintenanceCompanyUseCases {
  constructor(
    private maintenanceCompanyRepository: MaintenanceCompanyRepository,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  async getMaintenanceCompany(request: GetMaintenanceCompanyDTO) {
    if (
      !request.cnpj &&
      !request.corporateName &&
      !request.fantasyName &&
      !request.id &&
      !request.legalPersonId
    )
      throw new GraphQLError(
        'IS NECESSARY IN CNPJ, CORPORATENAME, FANTASYNAME, ID OR LEGALPERSONID',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    const maintenancecompany =
      await this.maintenanceCompanyRepository.findMaintenanceCompany(request);
    if (maintenancecompany) return maintenancecompany;

    throw new GraphQLError('MaintenanceCompany Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllMaintenanceCompanys(
    request: FindAllMaintenanceCompanyWhereRequestDTO,
  ) {
    const companies =
      await this.maintenanceCompanyRepository.getAllMaintenanceCompany(request);
    if (companies.length === 0)
      throw new GraphQLError('ANY MAINTENANCE COMPANY FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return companies;
  }

  async createMaintenanceCompany(data: CreateMaintenanceCompanyDTO) {
    if (data.LegalPerson)
      await this.legalPersonUseCase.validatePerson(data.LegalPerson);
    const maintenanceCompany = new MaintenanceCompany({
      specialty_maintenance: data.specialty_maintenance,
      updated_by: data.updated_by,
      created_by: data.created_by,
      legal_person_id: data.legal_person_id,
    });
    const legalPerson = LegalPersonEntityDto.createEntity(data.LegalPerson);

    return this.maintenanceCompanyRepository.createMaintenanceCompany(
      maintenanceCompany,
      legalPerson,
      data.legal_person_id,
    );
  }

  async updateMaintenanceCompany(
    id: string,
    data: UpdateMaintenanceCompanyDTO,
  ) {
    const legalPerson = LegalPersonEntityDto.updateEntity(data.LegalPerson);
    const maintenanceCompany = new MaintenanceCompany({
      specialty_maintenance: data.specialty_maintenance,
      updated_by: data.updated_by,
      created_by: null,
      legal_person_id: null,
    });

    return this.maintenanceCompanyRepository.updateMaintenanceCompany(
      id,
      maintenanceCompany,
      legalPerson,
    );
  }
}
