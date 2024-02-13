import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsoucedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedDriverDto';
import { OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreateOutsourcedDriverDTO } from 'app/dtos/OutsourcedDriverDto/CreateOutsourcedDriverDto';
import { type GetAllOutsourcedDriverDTO } from 'app/dtos/OutsourcedDriverDto/GetAllOutsourcedDriverDto';
import { type UpdateOutsourcedDriverDTO } from 'app/dtos/OutsourcedDriverDto/UpdateOutsoucedDriverDto';

import { ContractOutsourcedDriverUseCases } from '../ContractOutsourcedDriverUseCases/ContractOutsourcedDriverUseCases';
import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';

@Injectable()
export class OutsourcedDriverUseCases {
  constructor(
    private outsourcedDriverRepository: OutsourcedDriverRepository,
    private naturalPersonUseCase: NaturalPersonUseCases,
    private contractOutsourcedDriverUseCases: ContractOutsourcedDriverUseCases,
  ) {}
  async getOutsourcedDriver(request: GetOutsoucedDriverDTO) {
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
    const driver = await this.outsourcedDriverRepository.findOutsourcedDriver(
      request,
    );
    if (driver) return driver;

    throw new GraphQLError('DRIVER Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllOutsourcedDriver(request: GetAllOutsourcedDriverDTO) {
    return await this.outsourcedDriverRepository.findAllOutsourcedDriver(
      request,
    );
  }

  async createOutsourcedDriver(data: CreateOutsourcedDriverDTO) {
    const driverExist =
      await this.outsourcedDriverRepository.findOutsourcedDriver(data);
    if (driverExist?.cnh == data.cnh)
      throw new GraphQLError('CNH ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);

    const outsourcedDriver = new OutsourcedDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      course_mopp: data.course_mopp,
      natural_person_id: data.natural_person_id,
      created_by: data.created_by,
      updated_by: data.updated_by,
      outsourced_vehicle_id: data.outsourced_vehicle_id,
      company_vehicle_id: data.company_vehicle_id,
    });
    const naturalPerson = NaturalPersonEntityDto.createEntity(
      data.NaturalPerson,
    );
    const outsourcedDriverCreated =
      await this.outsourcedDriverRepository.createOutsourcedDriver(
        outsourcedDriver,
        naturalPerson,
      );
    data.ContractOutsourcedDriver.outsourced_driver_id =
      outsourcedDriverCreated.id;
    data.ContractOutsourcedDriver.updated_by = outsourcedDriver.created_by;
    data.ContractOutsourcedDriver.created_by = outsourcedDriver.updated_by;

    await this.contractOutsourcedDriverUseCases.createAllContractOutsourcedDriver(
      data.ContractOutsourcedDriver,
    );

    return outsourcedDriverCreated;
  }

  async updateOutsourcedDriver(id: string, data: UpdateOutsourcedDriverDTO) {
    console.log(data);
    await this.naturalPersonUseCase.valitePerson({
      cpf: data.NaturalPerson?.cpf,
      rg: data.NaturalPerson?.rg,
      id: data?.natural_person_id,
    });
    const outsourcedDriver = new OutsourcedDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      course_mopp: data.course_mopp,
      natural_person_id: data.natural_person_id,
      updated_by: data.updated_by,
      outsourced_vehicle_id: data.outsourced_vehicle_id,
      company_vehicle_id: data.company_vehicle_id,
    });
    const naturalPerson = NaturalPersonEntityDto.updateEntity(
      data.NaturalPerson,
    );

    return this.outsourcedDriverRepository.updateOutsourcedDriver(
      id,
      outsourcedDriver,
      naturalPerson,
    );
  }
}
