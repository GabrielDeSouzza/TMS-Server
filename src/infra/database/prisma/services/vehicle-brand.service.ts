import { Injectable } from '@nestjs/common';

import {
  VehicleBrand,
  type IVehicleBrand,
} from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { VehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import { VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';
import { type VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleBrandService implements VehicleBrandRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleBrandById(id: string): Promise<VehicleBrand> {
    const brand = await this.prisma.vehicleBrand.findFirstOrThrow({
      where: { id },
      include: { CreatedBy: true, UpdateBy: true },
    });
    const vehicleBrand = new VehicleBrand(
      {
        created_by: brand.CreatedBy.id,
        name: brand.name,
        updated_by: brand.UpdateBy.id,
        created_at: brand.created_at,
        updated_at: brand.updated_at,
      },
      brand.id,
    );

    return vehicleBrand;
  }
  async createVehicleBrand(vehicleBrand: IVehicleBrand): Promise<VehicleBrand> {
    const newVehicleBrand = await this.prisma.vehicleBrand.create({
      data: {
        name: vehicleBrand.name,
        created_at: vehicleBrand.created_at,
        CreatedBy: { connect: { id: vehicleBrand.created_by } },
        UpdateBy: { connect: { id: vehicleBrand.updated_by } },
        updated_at: vehicleBrand.updated_at,
      },
    });
    const vehicleBrandReturn = new VehicleBrand(
      {
        created_by: newVehicleBrand.created_by,
        name: newVehicleBrand.name,
        updated_by: newVehicleBrand.update_by,
        created_at: newVehicleBrand.created_at,
        updated_at: newVehicleBrand.created_at,
      },
      newVehicleBrand.id,
    );

    return vehicleBrandReturn;
  }
  async updateVehicleBrand(
    id: string,
    vehicleBrand: IVehicleBrand,
  ): Promise<VehicleBrand> {
    const updatedVehicleBrand = await this.prisma.vehicleBrand.update({
      where: { id },
      data: {
        name: vehicleBrand.name,
        created_at: vehicleBrand.created_at,
        CreatedBy: { connect: { id: vehicleBrand.created_by } },
        UpdateBy: { connect: { id: vehicleBrand.updated_by } },
        updated_at: vehicleBrand.updated_at,
      },
    });
    const vehicleBrandReturn = new VehicleBrand(
      {
        created_by: updatedVehicleBrand.created_by,
        name: updatedVehicleBrand.name,
        updated_by: updatedVehicleBrand.update_by,
        created_at: updatedVehicleBrand.created_at,
        updated_at: updatedVehicleBrand.created_at,
      },
      updatedVehicleBrand.id,
    );

    return vehicleBrandReturn;
  }
  async getAllVehicleBrand(): Promise<VehicleBrand[]> {
    const brands = await this.prisma.vehicleBrand.findMany({
      include: { VehicleModel: { include: { VehicleType: true } } },
    });
    const vehicleBrands = brands.map(
      brand =>
        new VehicleBrand({
          created_by: brand.created_by,
          name: brand.name,
          updated_by: brand.update_by,
          created_at: brand.created_at,
          updated_at: brand.updated_at,
          VehicleModels: brand.VehicleModel.map(
            model =>
              new VehicleModel({
                axles: model.axles,
                capacity_max: model.capacity_max,
                name: model.name,
                weight: model.weight,
                capacity_per_axle: model.capacity_per_axle,
                VehicleType: new VehicleType({
                  bodyWork: model.VehicleType.bodywork,
                  name: model.VehicleType.name,
                }),
                VehicleBrand: new VehicleBrand({
                  created_by: brand.created_by,
                  name: brand.name,
                  updated_by: brand.update_by,
                }),
                created_by: model.created_by,
                updated_by: model.update_by,
              }),
          ),
        }),
    );

    return vehicleBrands;
  }
}
