import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import {
  type CountMaintenanceCompanyRequestDTO,
  type FindAllMaintenanceCompanyWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';
import { MaintenanceCompanyRepository } from 'domain/repositories/MaintenanceCompanyRepositoy';

import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';
import { type CreateMaintenanceCompanyDTO } from 'app/dtos/MaintenanceCompanyDto/CreateMaintenanceCompanyDto';
import { type UpdateMaintenanceCompanyDTO } from 'app/dtos/MaintenanceCompanyDto/UpdateMaintenanceCompanyDto';
import { type UpdateManyMaintenanceCompanyDTO } from 'app/dtos/MaintenanceCompanyDto/UpdateManyMaintenanceCompanyDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';

@Injectable()
export class MaintenanceCompanyUseCases {
  constructor(
    private maintenanceCompanyRepository: MaintenanceCompanyRepository,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  async countMaintenanceCompany(request: CountMaintenanceCompanyRequestDTO) {
    return this.maintenanceCompanyRepository.countMaintenanceCompany(request);
  }
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
  async updateManyMaintenanceCompany(
    data: UpdateManyMaintenanceCompanyDTO[],
    updateBy: string,
  ) {
    for (const maintenancecompany of data)
      await this.verifyMaintenanceCompanyExist(maintenancecompany.id);
    const maintenancecompanys = data.map(maintenancecompany => {
      const maintenanceCompany = new MaintenanceCompany({
        specialty_maintenance: maintenancecompany.specialty_maintenance,
        updated_by: updateBy,
        created_by: null,
        legal_person_id: null,
        id: maintenancecompany.id,
      });
      const legalPerson = LegalPersonEntityDto.updateEntity(
        maintenancecompany.LegalPerson,
      );

      return {
        maintenanceCompany,
        legalPerson,
      };
    });

    return this.maintenanceCompanyRepository.updateManyMaintenanceCompany(
      maintenancecompanys,
    );
  }
  async deleteMaintenanceCompany(id: string) {
    await this.getMaintenanceCompany({ id });

    return this.maintenanceCompanyRepository.deleteMaintenanceCompany(id);
  }
  async deleteManyMaintenanceCompany(ids: string[]) {
    for (const maintenancecompanyId of ids)
      await this.verifyMaintenanceCompanyExist(maintenancecompanyId);

    return this.maintenanceCompanyRepository.deleteManyMaintenanceCompany(ids);
  }
  private async verifyMaintenanceCompanyExist(id: string) {
    const exist =
      await this.maintenanceCompanyRepository.findMaintenanceCompany({
        id,
      });
    if (!exist)
      throw new GraphQLError(
        `THIS LEGAL CLIENT QUOTETABLE ID ${id} NOT FOUND`,
        {
          extensions: { code: HttpStatus.NOT_FOUND },
        },
      );
  }
}
