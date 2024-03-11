import {
  type Prisma,
  type RoutesLegalClient as RouteLegalClientPrisma,
} from '@prisma/client';

import { RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

export class RouteLegalClientPrismaDTO {
  public static PrismaToEntity(routePrisma: RouteLegalClientPrisma) {
    if (!routePrisma) return null;

    return new RouteLegalClient({
      address_number: routePrisma.address_number,
      cep: routePrisma.cep,
      city: routePrisma.city,
      order_processing_id: routePrisma.order_processing_id,
      neighborhood: routePrisma.neighborhood,
      public_place: routePrisma.public_place,
      uf: routePrisma.uf,
      complement: routePrisma.complement,
    });
  }
  public static EntityToPrisma(route: RouteLegalClient) {
    const userPrisma: RouteLegalClientPrisma = {
      address_number: route.address_number,
      cep: route.cep,
      city: route.city,
      complement: route.complement,
      created_at: route.created_at,
      id: route.id,
      order_processing_id: route.order_processing_id,
      neighborhood: route.neighborhood,
      public_place: route.public_place,
      uf: route.uf,
      updated_at: route.updated_at,
    };

    return userPrisma;
  }

  public static EntityToPrismaUpdate(route: RouteLegalClient) {
    const userUptade: Prisma.RoutesLegalClientUpdateInput = {
      address_number: route.address_number,
      cep: route.cep,
      city: route.city,
      complement: route.complement,
      created_at: route.created_at,
      id: route.id,
      OrderProcessing: { connect: { id: route.order_processing_id } },
      neighborhood: route.neighborhood,
      public_place: route.public_place,
      uf: route.uf,
      updated_at: route.updated_at,
    };

    return userUptade;
  }
}
