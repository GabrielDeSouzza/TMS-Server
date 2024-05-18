import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerDto';
import {
  type CountAllPhysicalCustomersWhereRequestDTO,
  type UpdateManyPhysicalCustomersDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
import { PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';
import { PhysicalCustomerRepository } from 'domain/repositories/PhysicalCustomerRepository';

import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreatePhysicalCustomerDTO } from 'app/dtos/PhysicalCustomerDto/CreatePhysicalCustomerDto';
import { type GetAllPhysicalCustomerDTO } from 'app/dtos/PhysicalCustomerDto/GetAllPhysicalCustomerDto';
import { type UpdatePhysicalCustomerDTO } from 'app/dtos/PhysicalCustomerDto/UpdatePhysicalCustomerDto';

import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';

@Injectable()
export class PhysicalCustomerUseCases {
  constructor(
    private physicalCustomerRepository: PhysicalCustomerRepository,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  async count(
    parameters: CountAllPhysicalCustomersWhereRequestDTO,
  ): Promise<number> {
    return await this.physicalCustomerRepository.count(parameters);
  }

  async updateManyPhysicalCustomers(
    PhysicalCustomers: UpdateManyPhysicalCustomersDTO[],
  ): Promise<PhysicalCustomer[]> {
    const updatePhysicalCustomers =
      await this.physicalCustomerRepository.updateMany(PhysicalCustomers);

    return updatePhysicalCustomers;
  }

  async deletePhysicalCustomer(id: string): Promise<PhysicalCustomer> {
    return await this.physicalCustomerRepository.delete(id);
  }

  async deleteManyPhysicalCustomers(
    ids: string[],
  ): Promise<PhysicalCustomer[]> {
    const deletePhysicalCustomers =
      await this.physicalCustomerRepository.deleteMany(ids);

    return deletePhysicalCustomers;
  }

  async getPhysicalCustomer(request: GetPhysicalCustomerDTO) {
    if (!request.cpf && !request.id && !request.naturalPersonId && !request.rg)
      throw new GraphQLError(
        'IS NECESSARY AN ID, CPF, RG OR NATURALPERSON ID',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    const physicalCustomerOrder =
      await this.physicalCustomerRepository.findPhysicalCustomer(request);
    console.log(request);
    if (!physicalCustomerOrder)
      throw new GraphQLError('ORDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return physicalCustomerOrder;
  }
  async getAllPhysicalCustomer(request: GetAllPhysicalCustomerDTO) {
    return this.physicalCustomerRepository.findAllPhysicalCustomer(request);
  }
  async createPhysicalCustomer(data: CreatePhysicalCustomerDTO) {
    await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);
    const physicalCustomer = new PhysicalCustomer({
      natural_person_id: data.natural_person_id,
      updated_by: data.updated_by,
      branch: data.branch,
      created_by: data.created_by,
    });
    const naturalPerson = data.NaturalPerson
      ? NaturalPersonEntityDto.createEntity(data.NaturalPerson)
      : undefined;

    return this.physicalCustomerRepository.createPhysicalCustomer(
      physicalCustomer,
      naturalPerson,
    );
  }
  async updatePhysicalCustomer(id: string, data: UpdatePhysicalCustomerDTO) {
    await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);
    const physicalCustomer = new PhysicalCustomer({
      updated_by: data.updated_by,
      branch: data.branch,
      natural_person_id: '',
    });
    const naturalPerson = NaturalPersonEntityDto.updateEntity(
      data.NaturalPerson,
    );

    return this.physicalCustomerRepository.updatePhysicalCustomer(
      id,
      physicalCustomer,
      naturalPerson,
    );
  }
}
