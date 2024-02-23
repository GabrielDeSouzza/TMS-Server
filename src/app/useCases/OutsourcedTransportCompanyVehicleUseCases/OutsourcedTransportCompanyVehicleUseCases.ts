import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsourcedTransportVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportVehicleDto';
import { type FindAllOutsourcedTransportVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportVehicleRepositoryDto';
import { OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';

import { type CreateOutsourcedTransportCompanyVehicle } from 'app/dtos/OutsourcedTransportCompanyVehicleDto/CreateOutsourcedTransportCompanyVehicleDto';
import { type UpdateOutsourcedTransportCompanyVehicleDTO } from 'app/dtos/OutsourcedTransportCompanyVehicleDto/UpdateOutsourcedTransportCompanyVehicleDto';
import { VehicleEntityDTO } from 'app/dtos/VehicleDto/VehicleEntityDto';

import { OutsourcedTransportCompanyUseCases } from '../OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';
import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OutsourcedTransportCompanyVehicleUseCases {
  constructor(
    private outsourcedTransportCompanyVehicleRepository: OutsourcedTransportVehicleRepository,
    private outsourcedTransportCompany: OutsourcedTransportCompanyUseCases,
    private vehicleUseCases: VehicleUseCases,
  ) {}
  async getOutsourcedTransportCompanyVehicle(
    request: GetOutsourcedTransportVehicleDTO,
  ) {
    if (!request.id && !request.plate && !request.vehicleId)
      throw new GraphQLError('IS NECESSARY AN ID, PLATE OR VEHICLEID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return this.outsourcedTransportCompanyVehicleRepository.findOutsourcedTransportVehicle(
      request,
    );
  }
  async getAllOutsourcedTransportCompanyVehicle(
    request: FindAllOutsourcedTransportVehicleWhereRequestDTO,
  ) {
    return this.outsourcedTransportCompanyVehicleRepository.getAllOutsourcedTransportVehicle(
      request,
    );
  }
  async createOutsourcedTransportCompanyVehicle(
    data: CreateOutsourcedTransportCompanyVehicle,
  ) {
    await this.vehicleUseCases.validateVehicle({
      plate: data.Vehicle.plate,
      renavam: data.Vehicle.renavam,
    });

    const traspCompany =
      await this.outsourcedTransportCompany.getOutsourcedTransportCompany({
        id: data.outsourced_company_id,
      });

    if (!traspCompany)
      throw new GraphQLError('Outsourced Transport Company no Found');
    const vehicle = VehicleEntityDTO.createEntity(data.Vehicle);

    const outsourcedTraspVehicle = new OutsourcedTransportVehicle({
      created_by: data.created_by,
      updated_by: data.updated_by,
      outsourced_company_id: data.outsourced_company_id,
      vehicle_id: null,
    });

    return await this.outsourcedTransportCompanyVehicleRepository.createOutsourcedTransportVehicle(
      outsourcedTraspVehicle,
      vehicle,
    );
  }

  async updateOutsourcedTransportCompanyVehicle(
    id: string,
    data: UpdateOutsourcedTransportCompanyVehicleDTO,
  ) {
    console.log(data);

    if (data.outsourced_company_id) {
      const traspCompany =
        await this.outsourcedTransportCompany.getOutsourcedTransportCompany({
          id: data.outsourced_company_id,
        });

      if (!traspCompany)
        throw new GraphQLError('Outsourced Transport Company no Found');
    }

    const outsourcedTraspVehicle = new OutsourcedTransportVehicle({
      updated_by: data.updated_by,
      created_by: null,
      outsourced_company_id: data.outsourced_company_id,
      vehicle_id: null,
    });
    const vehicle = VehicleEntityDTO.updateEntity(data.Vehicle);

    return this.outsourcedTransportCompanyVehicleRepository.updateOutsourcedTransportVehicle(
      id,
      outsourcedTraspVehicle,
      vehicle,
    );
  }
}
