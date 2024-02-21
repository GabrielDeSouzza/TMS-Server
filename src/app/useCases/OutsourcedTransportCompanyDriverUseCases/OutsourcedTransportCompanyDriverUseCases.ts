import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsourcedTransportCompanyDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompanyDriverDto';
import { type FindAllOutsourcedTransportCompanyDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyDriverRepositoryDto';
import { OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';
import { OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreateOutsourcedTransportCompanyDriverDTO } from 'app/dtos/OutsourcedTransportCompanyDriverDto/CreateOutsourcedTransportCompanyDriveDto';
import { type UpdateOutsourcedTransportCompanyDriverDTO } from 'app/dtos/OutsourcedTransportCompanyDriverDto/UpdateOutsourcedTransportCompanyDriverDto';

import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';
import { OutsourcedTransportCompanyUseCases } from '../OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';

@Injectable()
export class OutsourcedTransportCompanyDriverUseCases {
  constructor(
    private outsourcedTransportCompanyDriverRepository: OutsourcedTransportCompanyDriverRepository,
    private naturalPersonUseCase: NaturalPersonUseCases,
    private outsourcedTransportCompanyUseCases: OutsourcedTransportCompanyUseCases,
  ) {}
  async getOutsourcedTransportCompanyDriver(
    request: GetOutsourcedTransportCompanyDriverDTO,
  ) {
    if (
      !request.cnh &&
      !request.cpf &&
      !request.id &&
      !request.naturalPersonId &&
      !request.rg
    )
      throw new GraphQLError(
        'IS NECESSARY AN ID, CNH, CPF, RG, NATURALPERSONID OR RG ',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );

    return this.outsourcedTransportCompanyDriverRepository.findOutsourcedTransportCompanyDriver(
      request,
    );
  }
  async getAllOutsourcedTransportCompanyDriver(
    request: FindAllOutsourcedTransportCompanyDriverWhereRequestDTO,
  ) {
    return this.outsourcedTransportCompanyDriverRepository.getAllOutsourcedTransportCompanyDriver(
      request,
    );
  }

  async createOutsourcedTransportCompanyDriver(
    data: CreateOutsourcedTransportCompanyDriverDTO,
  ) {
    await this.naturalPersonUseCase.valitePerson(data?.NaturalPerson);
    const outTransCompany =
      await this.outsourcedTransportCompanyUseCases.getOutsourcedTransportCompany(
        {
          id: data.outsourced_transport_company_id,
        },
      );
    if (!outTransCompany)
      throw new GraphQLError(
        'IS NECESSARY AN Outsourced Transport Company ID VALID',
        { extensions: { code: HttpStatus.NOT_FOUND } },
      );

    const naturalPersonEntity = NaturalPersonEntityDto.createEntity(
      data?.NaturalPerson,
    );
    const outTranspDriver = new OutsourcedTransportCompanyDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      course_mopp: data.course_mopp,
      created_by: data.created_by,
      outsourced_transport_company_id: data.outsourced_transport_company_id,
      natural_person_id: data.natural_person_id,
      updated_by: data.updated_by,
    });

    return this.outsourcedTransportCompanyDriverRepository.createOutsourcedTransportCompanyDriver(
      outTranspDriver,
      naturalPersonEntity,
    );
  }
  async updateOutsourcedTransportCompanyDriver(
    id: string,
    data: UpdateOutsourcedTransportCompanyDriverDTO,
  ) {
    console.log({ id, data });
    await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);

    if (data.outsourced_transport_company_id) {
      const outTransCompany =
        await this.outsourcedTransportCompanyUseCases.getOutsourcedTransportCompany(
          {
            id: data.outsourced_transport_company_id,
          },
        );
      if (!outTransCompany)
        throw new GraphQLError(
          'IS NECESSARY AN Outsourced Transport Company ID VALID',
          { extensions: { code: HttpStatus.NOT_FOUND } },
        );
    }

    const naturalPersonEntity = NaturalPersonEntityDto.updateEntity(
      data.NaturalPerson,
    );
    const outTranspDriver = new OutsourcedTransportCompanyDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      course_mopp: data.course_mopp,
      created_by: null,
      outsourced_transport_company_id: data.outsourced_transport_company_id,
      natural_person_id: null,
      updated_by: data.updated_by,
    });

    return this.outsourcedTransportCompanyDriverRepository.updateOutsourcedTransportCompanyDriver(
      id,
      outTranspDriver,
      naturalPersonEntity,
    );
  }
}
