import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerMerchandiseDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerMerchandiseDto';
import { type FindAllPhysicalCustomerMerchandiseWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerMerchandiseRepositoryDto';
import { PhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';
import { PhysicalCustomerMerchandiseRepository } from 'domain/repositories/PhysicalCustomerMerchandise.repository';

import { type CreatePhysicalCustomerMerchandiseDTO } from 'app/dtos/PhysicalCustomerMerchandiseDto/CreatePhysicalCustomerMerchandiseDto';
import { type UpdatePhysicalCustomerMerchandiseDTO } from 'app/dtos/PhysicalCustomerMerchandiseDto/UpdatePhysicalCustomerMerchandiseDto';

@Injectable()
export class PhysicalCustomerMerchandiseUseCases {
  constructor(
    private physicalCustomerMerchandiseRepository: PhysicalCustomerMerchandiseRepository,
  ) {}
  async getPhysicalCustomerMerchandise(
    request: GetPhysicalCustomerMerchandiseDTO,
  ) {
    if (!request.codMerchandise && !request.id) {
      throw new GraphQLError('IS NECESSARY AN ID OR COD MERCHANDISE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const merchandise =
      await this.physicalCustomerMerchandiseRepository.findPhysicalCustomerMerchandise(
        request,
      );

    if (merchandise) {
      return merchandise;
    }

    throw new GraphQLError('MERCHANDISE NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllPhysicalCustomerMerchandise(
    request: FindAllPhysicalCustomerMerchandiseWhereRequestDTO,
  ) {
    return this.physicalCustomerMerchandiseRepository.getAllLegalClientMerchandise(
      request,
    );
  }

  async getMerchandisesForOrder(orderId: string) {
    return this.physicalCustomerMerchandiseRepository.findLegalClientMerchandisesByOrder(
      orderId,
    );
  }

  async createPhysicalCustomerMerchandise(
    data: CreatePhysicalCustomerMerchandiseDTO,
  ) {
    const merchandiseExist =
      await this.physicalCustomerMerchandiseRepository.findPhysicalCustomerMerchandise(
        {
          codMerchandise: data.codMerchandise,
        },
      );

    if (merchandiseExist) {
      throw new GraphQLError('COD MERCHANDISE ALREADY IN USE');
    }

    const merchandise = new PhysicalCustomerMerchandise({
      amount: data.amount,
      codMerchandise: data.codMerchandise,
      description: data.description,
      physicalCustomerOrderId: data.physicalCustomerOrderId,
      mass: data.mass,
      value: data.value,
      volume: data.volume,
      invoicePhysicalClient: data.invoicePhysicalClient,
    });

    return this.physicalCustomerMerchandiseRepository.createPhysicalCustomerMerchandise(
      merchandise,
    );
  }

  async updatePhysicalCustomerMerchandise(
    id: string,
    data: UpdatePhysicalCustomerMerchandiseDTO,
  ) {
    const merchandise = new PhysicalCustomerMerchandise({
      amount: data.amount,
      codMerchandise: null,
      description: data.description,
      physicalCustomerOrderId: data.physicalCustomerOrderId,
      mass: data.mass,
      value: data.value,
      volume: data.volume,
      invoicePhysicalClient: data.invoicePhysicalClient,
    });

    return this.physicalCustomerMerchandiseRepository.updatePhysicalCustomerMerchandise(
      id,
      merchandise,
    );
  }
}
