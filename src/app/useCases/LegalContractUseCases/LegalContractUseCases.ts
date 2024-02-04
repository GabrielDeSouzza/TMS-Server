import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalContractDTO } from 'domain/dto/repositories/getDataDtos/GetLegalContractDto';
import { LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';

import { type CreateLegalContractDTO } from 'app/dtos/LegalContracDto/CreateLegalContractDto';
import { type GetAllLegalContractDTO } from 'app/dtos/LegalContracDto/GetAllLegalContractDto';
import { type UpdateLegalContractDTO } from 'app/dtos/LegalContracDto/UpdateLegalContractDto';

@Injectable()
export class LegalContractUseCases {
  constructor(private legalContractRepository: LegalContractRepository) {}
  async getContract(request: GetLegalContractDTO) {
    if (!request.contractNumber && !request.id)
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const contract = await this.legalContractRepository.findLegalContract(
      request.id,
      request.contractNumber,
    );
    if (contract) return contract;

    throw new GraphQLError('CONTRACT NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllContracts(request: GetAllLegalContractDTO) {
    return this.legalContractRepository.getAllLegalContract(request);
  }
  async createContract(data: CreateLegalContractDTO) {
    const contractNumberExist =
      await this.legalContractRepository.findLegalContract(
        null,
        data.contract_number,
      );
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
}
