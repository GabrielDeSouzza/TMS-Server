import { Injectable } from '@nestjs/common';

import {
  VehicleModel,
  type IVehicleModel,
} from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import { type VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { PrismaService } from '../prisma.service';
import { VehicleModelPrismaDTO } from './prismaDTO/VehicleModelPrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleModelService implements VehicleModelRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleModelById(id: string): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.findFirstOrThrow({
      where: { id },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async createVehicleModel(vehicleModel: IVehicleModel): Promise<VehicleModel> {
    const createdModel = await this.prisma.vehicleModel.create({
      data: VehicleModelPrismaDTO.EntityToPrisma(vehicleModel),
      select: {
        axles: true,
        brand_id: true,
        capacity_max: true,
        capacity_per_axle: true,
        created_at: true,
        created_by: true,
        id: true,
        name: true,
        type_id: true,
        update_by: true,
        updated_at: true,
        weight: true,
      },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(createdModel);
  }
  async updateVehicleModel(
    id: string,
    vehicleModel: IVehicleModel,
  ): Promise<VehicleModel> {
    const vehicleModelPrisma = await this.prisma.vehicleModel.update({
      data: VehicleModelPrismaDTO.EntityToPrismaUpdate(vehicleModel),
      where: { id },
      select: {
        axles: true,
        brand_id: true,
        capacity_max: true,
        capacity_per_axle: true,
        created_at: true,
        created_by: true,
        id: true,
        type_id: true,
        name: true,
        update_by: true,
        updated_at: true,
        weight: true,
      },
    });

    return VehicleModelPrismaDTO.PrismaToEntity(vehicleModelPrisma);
  }
  async getAllVehicleModel(): Promise<VehicleModel[]> {
    const models = await this.prisma.vehicleModel.findMany();

    return models.map(
      model => new VehicleModel(VehicleModelPrismaDTO.PrismaToEntity(model)),
    );
  }
}
