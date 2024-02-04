import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetCompanyVehcicleDTO } from 'domain/dto/repositories/getDataDtos/GetCompanyVehicleDto';
import { CompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';
import { CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { type CreateCompanyVehcicleDTO } from 'app/dtos/CompanyVehicleDto/CreateCompanyVehicle';
import { type GetAllCompanyVehcicleDTO } from 'app/dtos/CompanyVehicleDto/GetAllCompanyVehicle';
import { type UpdateCompanyVehcicleDTO } from 'app/dtos/CompanyVehicleDto/UpdateCompanyVehicleDto';
import { VehicleEntityDTO } from 'app/dtos/VehicleDto/VehicleEntityDto';

@Injectable()
export class CompanyVehicleUseCases {
  constructor(
    private companyVehicleRepository: CompanyVehicleRepository,
    private vehicleRepository: VehicleRepository,
  ) {}
  async getCompanyVehicle(
    request: GetCompanyVehcicleDTO,
  ): Promise<CompanyVehicle> {
    if (!request.id || !request.plate)
      new GraphQLError('IS NECESSARY AN ID OR PLATE VEHICLE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const companyVehicle =
      await this.companyVehicleRepository.findCompanyVehicle(
        request.id,
        request.plate,
      );
    if (companyVehicle) return companyVehicle;

    throw new GraphQLError('VEHICLE NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllCompanyVehicle(request: GetAllCompanyVehcicleDTO) {
    return await this.companyVehicleRepository.findAllCompanyVehicle(request);
  }
  async createCompanyVehicle(data: CreateCompanyVehcicleDTO) {
    const vehicleExist = await this.vehicleRepository.validadeVehicle({
      plate: data.Vehicle.plate,
      renavam: data.Vehicle.renavam,
    });

    if (vehicleExist)
      throw new GraphQLError('VEHICLE ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });

    const vehicleEntity = VehicleEntityDTO.createEntity(data.Vehicle);
    const companyVehicleEntity = new CompanyVehicle({
      carrier_company_id: data.carrier_company_id,
      created_by: data.created_by,
      updated_by: data.updated_by,
      vehicle_id: vehicleEntity.id,
    });

    return await this.companyVehicleRepository.createCompanyVehicle(
      companyVehicleEntity,
      vehicleEntity,
    );
  }

  async updateCompanyVehicle(id: string, data: UpdateCompanyVehcicleDTO) {
    const vehicleEntity = VehicleEntityDTO.updateEntity(data.Vehicle);
    const companyVehicleEntity = new CompanyVehicle({
      carrier_company_id: data.carrier_company_id,
      updated_by: data.updated_by,
      vehicle_id: vehicleEntity.id,
      created_by: '',
    });

    return await this.companyVehicleRepository.updateCompanyVehicle(
      id,
      companyVehicleEntity,
      vehicleEntity,
    );
  }
}
