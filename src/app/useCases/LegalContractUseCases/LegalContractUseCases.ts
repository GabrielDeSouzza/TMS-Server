import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalContractDTO } from 'domain/dto/repositories/getDataDtos/GetLegalContractDto';
import {
  type FindAllLegalContractWhereRequestDTO,
  type CountLegalContractRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalContractRepositoryDto';
import { LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { type CreateLegalContractDTO } from 'app/dtos/LegalContracDto/CreateLegalContractDto';
import { type UpdateLegalContractDTO } from 'app/dtos/LegalContracDto/UpdateLegalContractDto';
import { type UpdateManyLegalContractDTO } from 'app/dtos/LegalContracDto/UpdateManyLegalContractDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class LegalContractUseCases {
  constructor(private legalContractRepository: LegalContractRepository) {}
  async countLegalContract(request: CountLegalContractRequestDTO) {
    return this.legalContractRepository.countLegalContract(request);
  }
  async getContract(request: GetLegalContractDTO) {
    if (!request.contractNumber && !request.id)
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const contract = await this.legalContractRepository.findLegalContract(
      request,
    );
    if (contract) return contract;

    throw new GraphQLError('CONTRACT NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllContracts(request: FindAllLegalContractWhereRequestDTO) {
    return this.legalContractRepository.getAllLegalContract(request);
  }
  async createContract(data: CreateLegalContractDTO) {
    data.contract_number = 'CLC' + generateRandomNumber(8);
    const contractNumberExist =
      await this.legalContractRepository.findLegalContract({
        contractNumber: data.contract_number,
      });
    if (contractNumberExist)
      throw new GraphQLError('ERROR, CONTRACT NUMBER ALREADY IN  USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    const legalContract = new LegalContract({
      carrier_company_id: data.carrier_company_id,
      contract_number: data.contract_number,
      delivery_conditions: data.delivery_conditions,
      effective_date: data.effective_date,
      legal_client_id: data.legal_client_id,
      updated_by: data.updated_by,
      created_by: data.created_by,
      observations: data.observations,
    });

    return this.legalContractRepository.createLegalContract(legalContract);
  }
  async updateContract(id: string, data: UpdateLegalContractDTO) {
    const legalContract = new LegalContract({
      carrier_company_id: data.carrier_company_id,
      contract_number: null,
      delivery_conditions: data.delivery_conditions,
      effective_date: data.effective_date,
      legal_client_id: data.legal_client_id,
      updated_by: data.updated_by,
      created_by: null,
      observations: data.observations,
    });

    return this.legalContractRepository.updateLegalContract(id, legalContract);
  }

  async updateManyLegalContract(
    data: UpdateManyLegalContractDTO[],
    updateBy: string,
  ) {
    for (const legalcontract of data)
      await this.verifyLegalContractExist(legalcontract.id);
    const legalcontracts = data.map(legalcontract => {
      const updateLegalContract = new LegalContract({
        carrier_company_id: legalcontract.carrier_company_id,
        contract_number: null,
        delivery_conditions: legalcontract.delivery_conditions,
        effective_date: legalcontract.effective_date,
        legal_client_id: legalcontract.legal_client_id,
        updated_by: updateBy,
        created_by: null,
        observations: legalcontract.observations,
        id: legalcontract.id,
      });

      return updateLegalContract;
    });

    return this.legalContractRepository.updateManyLegalContract(legalcontracts);
  }
  async deleteLegalContract(id: string) {
    await this.getContract({ id });

    return this.legalContractRepository.deleteLegalContract(id);
  }
  async deleteManyLegalContract(ids: string[]) {
    for (const legalcontractId of ids)
      await this.verifyLegalContractExist(legalcontractId);

    return this.legalContractRepository.deleteManyLegalContract(ids);
  }
  private async verifyLegalContractExist(id: string) {
    const exist = await this.legalContractRepository.findLegalContract({
      id,
    });
    if (!exist)
      throw new GraphQLError(
        `THIS LEGAL CLIENT QUOTETABLE ID ${id} NOT FOUND`,
        {
          extensions: { code: HttpStatus.NOT_FOUND },
        },
      );
  }
}
