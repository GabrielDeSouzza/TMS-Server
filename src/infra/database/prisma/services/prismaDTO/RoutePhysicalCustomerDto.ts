import {
  type Prisma,
  type RoutesPhysicalCustomer as RoutePhysicalCustomerPrisma,
} from '@prisma/client';

import { RoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';

export class RoutePhysicalCustomerPrismaDTO {
  public static PrismaToEntity(routePrisma: RoutePhysicalCustomerPrisma) {
    if (!routePrisma) return null;

    return new RoutePhysicalCustomer({
      address_number: routePrisma.address_number,
      cep: routePrisma.cep,
      city: routePrisma.city,
      physicalCustomerOrderId: routePrisma.physicalCustomerOrderId,
      neighborhood: routePrisma.neighborhood,
      public_place: routePrisma.public_place,
      uf: routePrisma.uf,
      complement: routePrisma.complement,
    });
  }
  public static EntityToPrisma(route: RoutePhysicalCustomer) {
    const userPrisma: RoutePhysicalCustomerPrisma = {
      address_number: route.address_number,
      cep: route.cep,
      city: route.city,
      complement: route.complement,
      created_at: route.created_at,
      id: route.id,
      physicalCustomerOrderId: route.physicalCustomerOrderId,
      neighborhood: route.neighborhood,
      public_place: route.public_place,
      uf: route.uf,
      updated_at: route.updated_at,
    };

    return userPrisma;
  }

  public static EntityToPrismaUpdate(route: RoutePhysicalCustomer) {
    const userUptade: Prisma.RoutesPhysicalCustomerUpdateInput = {
      address_number: route.address_number,
      cep: route.cep,
      city: route.city,
      complement: route.complement,
      created_at: route.created_at,
      id: route.id,
      PhysicalCustomerOrder: { connect: { id: route.physicalCustomerOrderId } },
      neighborhood: route.neighborhood,
      public_place: route.public_place,
      uf: route.uf,
      updated_at: route.updated_at,
    };

    return userUptade;
  }
}
