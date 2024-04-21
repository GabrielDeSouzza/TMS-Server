import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetContractOutsourcedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetContractOutsourcedDriverDto';
import {
  type CountAllContractOutsourcedDriverWhereRequestDTO,
  type FindAllContractOutsourcedDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ContractOutsourcedDriverRepositoryDto';
import { ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';

import { type CreateContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/CreateContractOutsourcedDriverDto';
import { type UpdateContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/UpdateContractOutsourcedDriverDto';
import { type UpdateManyContractOutsourcedDriverDTO } from 'app/dtos/ContractOutsourcedDriverDto/UpdateManyContractOutsourcedDriverDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class ContractOutsourcedDriverUseCases {
  constructor(
    private contractOutsourcedDriverRepository: ContractOutsourcedDriverRepository,
  ) {}
  async countContractOutsourcedDriver(
    request: CountAllContractOutsourcedDriverWhereRequestDTO,
  ) {
    return this.contractOutsourcedDriverRepository.countContractOutsourcedDriver(
      request,
    );
  }
  async getContractOutsourcedDriver(request: GetContractOutsourcedDriverDTO) {
    if (!request.contractNumber && !request.id) {
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const contract =
      await this.contractOutsourcedDriverRepository.getContractOutsourcedDriver(
        request,
      );
    if (contract) return contract;

    throw new GraphQLError('Contract Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllContractOutsourcedDriver(
    request: FindAllContractOutsourcedDriverWhereRequestDTO,
  ) {
    return this.contractOutsourcedDriverRepository.findAllContracOutsourcedDriver(
      request,
    );
  }
  async createAllContractOutsourcedDriver(
    data: CreateContractOutsourcedDriverDTO,
  ) {
    const contractExist =
      await this.contractOutsourcedDriverRepository.getContractOutsourcedDriver(
        { contractNumber: data.contract_number },
      );

    if (contractExist) {
      throw new GraphQLError('CONTRACT NUMBER ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    data.contract_number = generateRandomNumber(8);
    const newContract = new ContractOutsourcedDriver({
      cpf: data.cpf,
      created_by: data.created_by,
      contract_number: data.contract_number,
      outsourced_driver_id: data.outsourced_driver_id,
      situation: data.situation,
      start_at: data.start_at,
      type: data.type,
      end_at: data.end_at,
      updated_by: data.updated_by,
    });

    return this.contractOutsourcedDriverRepository.createContractOutsourcedDriver(
      newContract,
    );
  }

  async updateContractOutsourcedDriver(
    id: string,
    data: UpdateContractOutsourcedDriverDTO,
  ) {
    const updateContract = new ContractOutsourcedDriver({
      cpf: data.cpf,
      created_by: null,
      contract_number: null,
      outsourced_driver_id: data.outsourced_driver_id,
      situation: data.situation,
      start_at: data.start_at,
      type: data.type,
      end_at: data.end_at,
      updated_by: data.updated_by,
    });

    return this.contractOutsourcedDriverRepository.updateContractOutsourcedDriver(
      id,
      updateContract,
    );
  }

  async updateManyContractOutsourcedDriver(
    data: UpdateManyContractOutsourcedDriverDTO[],
    updatedBy: string,
  ): Promise<ContractOutsourcedDriver[]> {
    const contracts = await Promise.all(
      data.map(async contract => {
        const exist =
          await this.contractOutsourcedDriverRepository.getContractOutsourcedDriver(
            { id: contract.id },
          );

        if (exist) {
          return new ContractOutsourcedDriver({
            cpf: contract.cpf,
            created_by: null,
            contract_number: null,
            outsourced_driver_id: contract.outsourced_driver_id,
            situation: contract.situation,
            start_at: contract.start_at,
            type: contract.type,
            end_at: contract.end_at,
            updated_by: updatedBy,
            id: contract.id,
          });
        } else {
          throw new GraphQLError(`CONTRACT WITH ID ${contract.id} NOT FOUND`, {
            extensions: { code: HttpStatus.BAD_REQUEST },
          });
        }
      }),
    );

    return this.contractOutsourcedDriverRepository.updateManyContractOutsourcedDriver(
      contracts,
    );
  }

  async deleteContractOutsourcedDriver(id: string) {
    await this.getContractOutsourcedDriver({ id });

    return this.contractOutsourcedDriverRepository.deleteContractOutsourcedDriver(
      id,
    );
  }
  async deleteManyContractOutsourcedDriver(ids: string[]) {
    await Promise.all(
      ids.map(async id => this.getContractOutsourcedDriver({ id })),
    );

    return this.contractOutsourcedDriverRepository.deleteManyContractOutsourcedDriver(
      ids,
    );
  }
}
