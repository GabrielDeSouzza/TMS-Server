import { Injectable } from '@nestjs/common';

import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { type VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class VehicleBrandService implements VehicleBrandRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleBrandById(id: string): Promise<VehicleBrand> {
    const brand = await this.prisma.vehicleBrand.findFirstOrThrow({
      where: { id },
    });
    console.log(brand);

    return VehicleBrandPrismaDTO.PrismaToEntity(brand);
  }
  async createVehicleBrand(vehicleBrand: VehicleBrand): Promise<VehicleBrand> {
    const newVehicleBrand = await this.prisma.vehicleBrand.create({
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(newVehicleBrand);
  }
  async updateVehicleBrand(
    id: string,
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand> {
    const updatedVehicleBrand = await this.prisma.vehicleBrand.update({
      where: { id },
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });
    const vehicleBrandReturn =
      VehicleBrandPrismaDTO.PrismaToEntity(updatedVehicleBrand);

    return vehicleBrandReturn;
  }
  async getAllVehicleBrand(): Promise<VehicleBrand[]> {
    const brands = await this.prisma.vehicleBrand.findMany();
    const vehicleBrands = brands.map(brand =>
      VehicleBrandPrismaDTO.PrismaToEntity(brand),
    );

    return vehicleBrands;
  }
}
