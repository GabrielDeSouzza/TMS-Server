import { Injectable } from '@nestjs/common';

import { type VehicleTypeContainsBody } from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';
import { type VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBodyworkPrismaDto } from './prismaDTO/VehicleBodyworkPrismaDto';
import { VehicleTypeContainsBodyPrismaDTO } from './prismaDTO/VehicleTypeContainsBody';

@Injectable()
export class VehicleContainsBodyService
  implements VehicleTypeContainsBodyRepository
{
  constructor(private prisma: PrismaService) {}

  async findVehicleTypeContainsBodyById(
    id?: string,
    typeId?: string,
    bodyId?: string,
  ): Promise<VehicleTypeContainsBody> {
    const vehicleTypeCbody =
      await this.prisma.vehicleTypeContainsBody.findFirstOrThrow({
        where: { OR: { id, AND: { type_id: typeId, bodywork_id: bodyId } } },
      });

    return VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(vehicleTypeCbody);
  }
  async createVehicleTypeContainsBody(
    vehicleTypeContainsBody: VehicleTypeContainsBody,
  ): Promise<VehicleTypeContainsBody> {
    if (!vehicleTypeContainsBody.created_by) {
      const createdBy =
        await this.prisma.vehicleTypeContainsBody.findFirstOrThrow({
          select: { created_by: true },
          where: {
            AND: {
              type_id: vehicleTypeContainsBody.vehicle_type_id,
              bodywork_id: vehicleTypeContainsBody.vehicle_bodywork_id,
            },
          },
        });
      vehicleTypeContainsBody.created_by = createdBy.created_by;
    }

    const vehicleCbody = await this.prisma.vehicleTypeContainsBody.upsert({
      create: {
        bodywork_id: vehicleTypeContainsBody.vehicle_bodywork_id,
        created_at: vehicleTypeContainsBody.created_at,
        created_by: vehicleTypeContainsBody.created_by,
        type_id: vehicleTypeContainsBody.vehicle_type_id,
        updated_at: vehicleTypeContainsBody.updated_at,
        updated_by: vehicleTypeContainsBody.updated_by,
      },
      where: {
        bodywork_id_type_id: {
          bodywork_id: vehicleTypeContainsBody.vehicle_bodywork_id,
          type_id: vehicleTypeContainsBody.vehicle_type_id,
        },
      },
      update: {
        created_by: vehicleTypeContainsBody.created_by,
      },
    });

    return VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(vehicleCbody);
  }

  async deleteVehicleTypeContainsBody(
    typeId: string,
    bodyId: string,
  ): Promise<string> {
    console.log('type ' + typeId);
    console.log('body ' + bodyId);
    await this.prisma.vehicleTypeContainsBody.delete({
      where: { bodywork_id_type_id: { bodywork_id: bodyId, type_id: typeId } },
    });

    return 'deletado com sucesso';
  }
  async getAllVehicleTypeContainsBody(): Promise<VehicleTypeContainsBody[]> {
    const vehicleCbodys = await this.prisma.vehicleTypeContainsBody.findMany();

    return vehicleCbodys.map(vehicleCbody =>
      VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(vehicleCbody),
    );
  }
  async getAllVehicleTypeContainsThisBody(
    typeId: string,
  ): Promise<VehicleTypeContainsBody[] | null> {
    const vehicleCbodies = await this.prisma.vehicleTypeContainsBody.findMany({
      where: { type_id: typeId },
    });

    if (vehicleCbodies.length > 0) {
      return vehicleCbodies.map(vehicleCbody =>
        VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(vehicleCbody),
      );
    }

    return null;
  }
  async getAllVehicleTypeBodies(
    typeId: string,
  ): Promise<VehicleTypeContainsBody[] | null | void[]> {
    const vehicleCbodies = await this.prisma.vehicleTypeContainsBody.findMany({
      where: { type_id: typeId },
      include: { VehicleBodywork: true },
    });

    if (vehicleCbodies.length > 0) {
      const vehicleCbodiesEntity = vehicleCbodies.map(vehicleCbody =>
        VehicleTypeContainsBodyPrismaDTO.PrismaToEntity(vehicleCbody),
      );

      const bodies = vehicleCbodies.map(body =>
        VehicleBodyworkPrismaDto.PrismaToEntity(body.VehicleBodywork),
      );

      for (const [index, entity] of vehicleCbodiesEntity.entries()) {
        entity.VehicleBodywork = [bodies[index]];
      }

      return vehicleCbodiesEntity;
    }

    return null;
  }
}
