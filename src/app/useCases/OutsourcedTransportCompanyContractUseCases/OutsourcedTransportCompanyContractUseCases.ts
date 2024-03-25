import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsourcedTransportCompanyContractDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompanyContractDto';
import { type FindAllOutsourcedTransportCompanyContractWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyContractRepositoryDto';
import { OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';
import { OutsourcedTransportCompanyContractRepository } from 'domain/repositories/OutsourcedTransportCompanyContract.repository';

import { type CreateOutsourcedTransportCompanyContractDTO } from 'app/dtos/OutsourcedTransportCompanyContractDto/CreateOutsourcedTransportCompanyContractDto';
import { type UpdateOutsourcedTransportCompanyContractDTO } from 'app/dtos/OutsourcedTransportCompanyContractDto/UpdateOutsourcedTransportCompanyContractDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { CarrierCompanyUseCases } from '../CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientUseCases';
import { OutsourcedTransportCompanyUseCases } from '../OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';

@Injectable()
export class OutsourcedTransportCompanyContractUseCases {
  constructor(
    private outsourcedTransportCompanyContractRepotory: OutsourcedTransportCompanyContractRepository,
    private outsourcedTransportCompanyUseCase: OutsourcedTransportCompanyUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
  ) {}
  async getOutsourcedTransportCompanyContract(
    request: GetOutsourcedTransportCompanyContractDTO,
  ) {
    if (!request.contractNumber && !request.id)
      throw new GraphQLError('IS NECESSARY A CONTRACT NUMBER OR AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return this.outsourcedTransportCompanyContractRepotory.findOutsourcedTransportCompanyContract(
      request,
    );
  }
  async getAllOutsourcedTransportCompanyContract(
    request: FindAllOutsourcedTransportCompanyContractWhereRequestDTO,
  ) {
    return this.outsourcedTransportCompanyContractRepotory.getAllOutsourcedTransportCompanyContract(
      request,
    );
  }
  async createOutsourcedTransportCompanyContract(
    data: CreateOutsourcedTransportCompanyContractDTO,
  ) {
    await this.validateCreate(data);
    const contract = new OutsourcedTransportCompanyContract({
      carrierCompanyId: data.carrierCompanyId,
      contractNumber: generateRandomNumber(8),
      created_by: data.created_by,
      legalClientOrderId: data.legalClientOrderId,
      outSourcedTransportCompanyId: data.outSourcedTransportCompanyId,
      updated_by: data.updated_by,
    });

    return this.outsourcedTransportCompanyContractRepotory.createOutsourcedTransportCompanyContract(
      contract,
    );
  }
  async updateOutsourcedTransportCompanyContract(
    id: string,
    data: UpdateOutsourcedTransportCompanyContractDTO,
  ) {
    const contractExist = await this.getOutsourcedTransportCompanyContract({
      id,
    });
    if (!contractExist)
      throw new GraphQLError('CONTRACT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    await this.validateUpdate(data);

    const contract = new OutsourcedTransportCompanyContract({
      carrierCompanyId: data.carrierCompanyId,
      outSourcedTransportCompanyId: data.outSourcedTransportCompanyId,
      updated_by: data.updated_by,
      contractNumber: undefined,
      created_by: undefined,
      legalClientOrderId: undefined,
    });

    return this.outsourcedTransportCompanyContractRepotory.updateOutsourcedTransportCompanyContract(
      id,
      contract,
    );
  }

  private async validateCreate(
    data: CreateOutsourcedTransportCompanyContractDTO,
  ) {
    let erros = '';
    const outsourcedTransportCompany =
      await this.outsourcedTransportCompanyUseCase.getOutsourcedTransportCompany(
        {
          id: data.outSourcedTransportCompanyId,
        },
      );
    const carrierCompany = await this.carrierCompanyUseCase.getCarrierCompany({
      id: data.carrierCompanyId,
    });
    const legalClientOrder =
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.legalClientOrderId,
      });
    if (!outsourcedTransportCompany)
      erros += 'OUTSOURCED TRANSPORT COMPANY INVALID';
    if (!carrierCompany) erros += 'CARRIER COMPANY INVALID';
    if (!legalClientOrder) erros += 'LEGAL CLIENT ORDER INVALID';
    if (erros.length > 1)
      throw new GraphQLError(erros, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }

  private async validateUpdate(
    data: UpdateOutsourcedTransportCompanyContractDTO,
  ) {
    let erros = '';

    if (data.outSourcedTransportCompanyId) {
      const outsourcedTransportCompany =
        await this.outsourcedTransportCompanyUseCase.getOutsourcedTransportCompany(
          {
            id: data.outSourcedTransportCompanyId,
          },
        );
      if (!outsourcedTransportCompany)
        erros += 'OUTSOURCED TRANSPORT COMPANY INVALID';
    }

    if (data.carrierCompanyId) {
      const carrierCompany = await this.carrierCompanyUseCase.getCarrierCompany(
        {
          id: data.carrierCompanyId,
        },
      );
      if (!carrierCompany) erros += 'CARRIER COMPANY INVALID';
    }

    if (erros.length > 1)
      throw new GraphQLError(erros, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
