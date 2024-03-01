import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleBrandDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBrandDto';
import { type FindAllVehicleBrandWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBrandRepositoryDto';
import { VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { type CreateVehicleBrandDTO } from 'app/dtos/VehicleBrandDto/CreateVehicleBrandDto';
import { type UpdateVehicleBrandDTO } from 'app/dtos/VehicleBrandDto/UpdateVehicleBrandDto';

@Injectable()
export class VehicleBrandUseCases {
  constructor(private vehicleBrandRepository: VehicleBrandRepository) {}
  async getVehicleBrand(request: GetVehicleBrandDTO) {
    if (!request.id && !request.name) {
      throw new GraphQLError('IS NECESSARY AN ID OR BRAND NAME', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const brand = await this.vehicleBrandRepository.findVehicleBrand(request);
    if (brand) return brand;

    throw new GraphQLError('BRAND NOT FOND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllVehicleBrand(request: FindAllVehicleBrandWhereRequestDTO) {
    const brands = await this.vehicleBrandRepository.getAllVehicleBrand(
      request,
    );
    if (brands.length > 0) return brands;

    throw new GraphQLError('NO BRAND FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async createBrand(data: CreateVehicleBrandDTO) {
    const brandExist = await this.getVehicleBrand({ name: data.name });
    if (brandExist)
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    const brandEntity = new VehicleBrand({
      created_by: data.created_by,
      name: data.name,
      updated_by: data.updated_by,
    });

    return this.vehicleBrandRepository.createVehicleBrand(brandEntity);
  }
  async updateBrand(id: string, data: UpdateVehicleBrandDTO) {
    const brandExist = await this.getVehicleBrand({ name: data.name });
    if (brandExist)
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    const brandEntity = new VehicleBrand({
      created_by: null,
      name: data.name,
      updated_by: data.updated_by,
    });

    return this.vehicleBrandRepository.updateVehicleBrand(id, brandEntity);
  }
}
