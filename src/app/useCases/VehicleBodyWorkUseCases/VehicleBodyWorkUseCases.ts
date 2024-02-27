import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleBodyWorkDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBodWorkDto';
import { type FindAllVehicleBodyworkWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBodyworkRepositoryDto';
import { VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';
import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { type CreateVehicleBodyworkDTO } from 'app/dtos/VehicleBodyWorkDto/CreateVehicleBodyWorkDto';
import { type UpdateVehicleBodyworkDTO } from 'app/dtos/VehicleBodyWorkDto/UpdateVehicleBodyWorkDto';

@Injectable()
export class VehicleBodyworkUseCases {
  constructor(private vehicleBodyWorkRepository: VehicleBodyworkRepository) {}
  getVehicleBodyWork(request: GetVehicleBodyWorkDTO) {
    if (!request.id && !request.name)
      throw new GraphQLError('IS NECESSARY NA ID OR NAME', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return this.vehicleBodyWorkRepository.findVehicleBodywork(request);
  }
  getAllVehicleBodyWork(request: FindAllVehicleBodyworkWhereRequestDTO) {
    return this.vehicleBodyWorkRepository.getAllVehicleBodywork(request);
  }
  createVehicleBodyWork(data: CreateVehicleBodyworkDTO) {
    const bodyWork = new VehicleBodywork({
      axles: data.axles,
      created_by: data.created_by,
      mass: data.mass,
      name: data.name,
      updated_by: data.updated_by,
      volume: data.volume,
    });

    return this.vehicleBodyWorkRepository.createVehicleBodywork(bodyWork);
  }
  async updateVehicleBodyWork(id: string, data: UpdateVehicleBodyworkDTO) {
    const bodyExist = await this.getVehicleBodyWork({ id });
    if (!bodyExist)
      throw new GraphQLError('BODY WORK NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    const bodyWork = new VehicleBodywork({
      axles: data.axles,
      created_by: null,
      mass: data.mass,
      name: data.name,
      updated_by: data.updated_by,
      volume: data.volume,
    });

    return this.vehicleBodyWorkRepository.updateVehicleBodywork(id, bodyWork);
  }
  async verifyBodyWorksExists(bodyWorkIds: string[]) {
    const bodyWorkExists =
      await this.vehicleBodyWorkRepository.getAllVehicleBodywork({
        where: { id: { in: bodyWorkIds } },
        limit: 100,
        offset: 0,
        sort: undefined,
      });

    if (bodyWorkExists.length === 0) {
      throw new GraphQLError('BODY WORKS NOT FOUND', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const bdWorksExistsId = new Set(bodyWorkExists.map(body => body.id));

    const notFoundIds = bodyWorkIds.filter(
      bodyWorkId => !bdWorksExistsId.has(bodyWorkId),
    );

    if (notFoundIds.length > 0) {
      let erros = '';
      notFoundIds.map(notcomum => {
        erros += notcomum + ',';
      });
      erros += ' Not Founds';

      throw new GraphQLError(erros, {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    return;
  }
}
