/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { VehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { VehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import {
  VehicleType,
  type IVehicleType,
} from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';
import { type VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { PrismaService } from '../prisma.service';

//Codigo incompleto, Precisa resolver questões sobre os DTO´s para o prisma
@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleTypeService implements VehicleTypeRepository {
  constructor(private prisma = new PrismaService()) {}
  async findVehicleTypeById(id: string): Promise<VehicleType> {
    const vehicleTypePrisma = await this.prisma.vehicleType.findFirstOrThrow({
      where: { id },
      include: {
        CreatedBy: true,
        UpdateBy: true,
        VehicleModel: {
          include: { Vehicle: true, VehicleType: true, Brand: true },
        },
        VehicleTypeContainsBody: true,
      },
    });
    const vehicleType = new VehicleType({
      bodyWork: vehicleTypePrisma.bodywork,
      name: vehicleTypePrisma.name,
      VehicleModels: vehicleTypePrisma.VehicleModel.map(
        vehicle =>
          new VehicleModel({
            axles: vehicle.axles,
            capacity_max: vehicle.capacity_max,
            name: vehicle.name,
            VehicleBrand: new VehicleBrand({
              name: vehicle.Brand.name,
              created_by: vehicle.Brand.created_by,
              updated_by: vehicle.Brand.update_by,
              created_at: vehicle.Brand.created_at,
              updated_at: vehicle.Brand.updated_at,
              id: vehicle.Brand.id,
            }),
            VehicleType: new VehicleType({
              bodyWork: vehicle.VehicleType.bodywork,
              name: vehicle.VehicleType.name,
              created_at: vehicle.VehicleType.created_at,
              updated_at: vehicle.VehicleType.updated_at,
            }),
            weight: vehicle.weight,
            capacity_per_axle: vehicle.capacity_per_axle,
            created_at: vehicle.created_at,
            updated_at: vehicle.updated_at,
            created_by: vehicle.created_by,
            updated_by: vehicle.update_by,
          }),
      ),
    });

    throw new Error('Method not implemented.');
  }
  createVehicleType(vehicleBrand: IVehicleType): Promise<VehicleType> {
    throw new Error('Method not implemented.');
  }
  updateVehicleType(vehicleBrand: IVehicleType): Promise<VehicleType> {
    throw new Error('Method not implemented.');
  }
  getAllVehicleType(): Promise<VehicleType[]> {
    throw new Error('Method not implemented.');
  }
}
