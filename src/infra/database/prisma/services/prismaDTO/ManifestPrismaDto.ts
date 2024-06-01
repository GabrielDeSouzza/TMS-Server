import { type Prisma, type Manifest as ManifestPrisma } from '@prisma/client';

import { Manifest } from 'domain/entities/ManifestEntity/Manifest';

export class ManifestPrismaDTO {
  public static PrismaToEntity(manifestPrisma: ManifestPrisma) {
    if (!manifestPrisma) return null;

    return new Manifest({
      acess_key: manifestPrisma.acess_key,
      emission_date: manifestPrisma.emission_date,
      num_protocol: manifestPrisma.num_protocol,
      number: manifestPrisma.number,
      order_processing_id: manifestPrisma.order_processing_id,
      serie: manifestPrisma.serie,
      manifest_url: manifestPrisma.manifest_url,
    });
  }
  public static EntityToCreatePrisma(manifest: Manifest) {
    const manifestPrisma: Prisma.ManifestCreateInput = {
      acess_key: manifest.acess_key,
      emission_date: manifest.emission_date,
      num_protocol: manifest.num_protocol,
      number: manifest.number,
      OrderProcessing: { connect: { id: manifest.order_processing_id } },
      serie: manifest.serie,
      manifest_url: manifest.manifest_url,
    };

    return manifestPrisma;
  }
}
