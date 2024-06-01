import { Injectable } from '@nestjs/common';

import { type GetManifestDTO } from 'domain/dto/repositories/getDataDtos/GetManifestDto';
import {
  type CountManifestRequestDTO,
  type FindAllManifestWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ManifestRepositoryDto';
import { type Manifest } from 'domain/entities/ManifestEntity/Manifest';
import { type ManifestRepository } from 'domain/repositories/ManifestRepository';

import { PrismaService } from '../prisma.service';
import { ManifestPrismaDTO } from './prismaDTO/ManifestPrismaDto';

@Injectable()
export class ManifestPrismaService implements ManifestRepository {
  constructor(private prisma: PrismaService) {}

  countManifest(request: CountManifestRequestDTO): Promise<number> {
    return this.prisma.manifest.count({
      where: request.where ?? undefined,
    });
  }
  async findManifest(data: GetManifestDTO): Promise<Manifest> {
    const manifest = await this.prisma.manifest.findFirst({
      where: {
        OR: [{ id: data.id }],
      },
    });

    return ManifestPrismaDTO.PrismaToEntity(manifest);
  }
  async createManifest(manifest: Manifest): Promise<Manifest> {
    const manifestPrisma = await this.prisma.manifest.create({
      data: ManifestPrismaDTO.EntityToCreatePrisma(manifest),
    });

    return ManifestPrismaDTO.PrismaToEntity(manifestPrisma);
  }

  async findAllManifests(
    parameters: FindAllManifestWhereRequestDTO,
  ): Promise<Manifest[]> {
    const manifests = await this.prisma.manifest.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return manifests.map(manifest =>
      ManifestPrismaDTO.PrismaToEntity(manifest),
    );
  }
}
