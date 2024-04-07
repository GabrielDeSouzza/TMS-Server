import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreateOwnDriverDTO } from 'app/dtos/OwnDriverDto/CreateOwnDriverDto';
import { type GetAllOwnDriverDTO } from 'app/dtos/OwnDriverDto/GetAllOwnDriverDto';
import { type GetOwnDriverDTO } from 'app/dtos/OwnDriverDto/GetOwnDriverDto';
import { type UpdateOwnDriverDTO } from 'app/dtos/OwnDriverDto/UpdateOwnDriverDto';

import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';

@Injectable()
export class OwnDriverUseCases {
  constructor(
    private ownDriverRepository: OwnDriverRepository,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  async getOwnDriver(request: GetOwnDriverDTO) {
    if (
      !request.cnh &&
      !request.cpf &&
      !request.id &&
      !request.naturalPersonId &&
      !request.rg
    )
      throw new GraphQLError(
        'IS NECESSARY AN ID, CNH, CPF, RG OR NATURALPERSON ID',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    const ownDriver = await this.ownDriverRepository.findOwnDriver(request);
    if (ownDriver) return ownDriver;

    return null;
  }

  async getAllOwnDriver(request: GetAllOwnDriverDTO) {
    const ownDrivers = await this.ownDriverRepository.findAllOwnDrivers(
      request,
    );
    if (ownDrivers.length === 0)
      throw new GraphQLError('ANY OWN DRIVER FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return ownDrivers;
  }

  async createOwnDriver(data: CreateOwnDriverDTO) {
    let naturalPerson;
    await this.validadeCNH(data.cnh);

    if (!data.NaturalPerson && !data.natural_person_id)
      throw new GraphQLError('IS NECESSARY SEND A NATURAL PERSON', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    else if (data.NaturalPerson) {
      await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);
      naturalPerson = NaturalPersonEntityDto.createEntity(data.NaturalPerson);
    } else {
      await this.naturalPersonUseCase.getNaturalPerson({
        naturalPersonId: data.natural_person_id,
      });
    }

    const ownDriver = new OwnDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      company_vehicle: data.company_vehicle,
      course_mopp: data.course_mopp,
      created_by: data.created_by,
      natural_person_id: data.natural_person_id,
      updated_by: data.updated_by,
    });

    return this.ownDriverRepository.createOwnDriver(
      ownDriver,
      naturalPerson,
      data.natural_person_id,
    );
  }
  async updateOwnDriver(id: string, data: UpdateOwnDriverDTO) {
    console.log(data);
    if (data.cnh) await this.validadeCNH(data.cnh);
    else if (data.NaturalPerson)
      await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);
    const ownDriver = new OwnDriver({
      cnh: data.cnh,
      cnh_category: data.cnh_category,
      cnh_expiration: data.cnh_expiration,
      company_vehicle: data.company_vehicle,
      course_mopp: data.course_mopp,
      updated_by: data.updated_by,
    });

    const naturalPerson = NaturalPersonEntityDto.updateEntity(
      data.NaturalPerson,
    );

    return this.ownDriverRepository.updateOwnDriver(
      id,
      ownDriver,
      naturalPerson,
    );
  }

  private async validadeCNH(cnh: string) {
    const cnhInUse = await this.ownDriverRepository.findOwnDriver({ cnh });
    if (cnhInUse && cnhInUse.cnh)
      throw new GraphQLError('CNH ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
  }
}
