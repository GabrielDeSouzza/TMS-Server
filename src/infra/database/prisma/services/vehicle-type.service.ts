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

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleTypeService implements VehicleTypeRepository {
  constructor(private prisma = new PrismaService()) {}
  async findVehicleTypeById(id: string): Promise<VehicleType> {
    const vehicleTypePrisma = await this.prisma.vehicleType.findFirstOrThrow({
      where: { id },
      include: {
        VehicleModel: {
          include: { Vehicle: true, VehicleType: true, Brand: true },
        },
        VehicleTypeContainsBody: true,
      },
    });
    const vehicleType = new VehicleType({
      bodyWork: vehicleTypePrisma.bodywork,
      name: vehicleTypePrisma.name,
      created_by: vehicleTypePrisma.created_by,
      updated_by: vehicleTypePrisma.update_by,
      created_at: vehicleTypePrisma.created_at,
      updated_at: vehicleTypePrisma.updated_at,
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
              created_by: vehicle.VehicleType.created_by,
              updated_by: vehicle.VehicleType.update_by,
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

    return vehicleType;
  }
  async createVehicleType(vehicleType: IVehicleType): Promise<VehicleType> {
    await this.prisma.vehicleType.create({
      data: {
        name: vehicleType.name,
        bodywork: vehicleType.bodyWork,
        UpdateBy: { connect: { id: vehicleType.updated_by } },
        CreatedBy: { connect: { id: vehicleType.updated_by } },
        updated_at: vehicleType.updated_at,
        created_at: vehicleType.created_at,
      },
      select: {
        name: true,
        bodywork: true,
        created_at: true,
        created_by: true,
        id: true,
        update_by: true,
        updated_at: true,
      },
    });

    throw new Error('Method not implemented.');
  }
  updateVehicleType(
    id: string,
    vehicleBrand: Partial<IVehicleType>,
  ): Promise<VehicleType> {
    throw new Error('Method not implemented.');
  }
  getAllVehicleType(): Promise<VehicleType[]> {
    throw new Error('Method not implemented.');
  }
}
