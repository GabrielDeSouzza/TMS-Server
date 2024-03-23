import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetSenderDTO } from 'domain/dto/repositories/getDataDtos/GetSendertDto';
import { type FindAllSenderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/SenderRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { Sender } from 'domain/entities/Sender/Sender';
import { SenderRepository } from 'domain/repositories/SenderRepository';

import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';
import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreateSenderDTO } from 'app/dtos/SenderDto/CreateSenderDto';
import { type UpdateSenderDTO } from 'app/dtos/SenderDto/UpdateSenderDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';
import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';

@Injectable()
export class SenderUseCases {
  constructor(
    private senderRepository: SenderRepository,
    private legalPersonUseCase: LegalPersonUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  async getSender(request: GetSenderDTO) {
    if (!request.legalPerson && !request.id && !request.naturalPerson) {
      throw new GraphQLError(
        'IS NECESSARY AN ID, NATURAL PERSON OR LEGAL PERSON DATA',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    }

    const sender = await this.senderRepository.findSender(request);
    if (!sender)
      throw new GraphQLError('SENDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return sender;
  }

  async getAllSender(request: FindAllSenderWhereRequestDTO) {
    return this.senderRepository.findAllSender(request);
  }
  async createSender(data: CreateSenderDTO) {
    if (data.legal_person_id && data.natural_person_id)
      throw new GraphQLError(
        'YOU CAN ONLY PASS ONE NATURAL PERSON OR LEGAL ENTITY ID AND NOT BOTH AT THE SAME TIME',
        {
          extensions: { code: HttpStatus.CONFLICT },
        },
      );
    else if (
      !data.LegalPerson &&
      !data.NaturalPerson &&
      !data.legal_person_id &&
      !data.natural_person_id
    )
      throw new GraphQLError(
        'IS NECESSARY A LEGAL CLIENT OR PHYSICAL CUSTOMER',
        {
          extensions: { code: HttpStatus.CONFLICT },
        },
      );
    else if (data.natural_person_id)
      await this.naturalPersonUseCase.getNaturalPerson({
        naturalPersonId: data.natural_person_id,
      });
    else if (data.legal_person_id)
      await this.legalPersonUseCase.getLegalPerson({
        legalPersonId: data.legal_person_id,
      });
    else if (data.LegalPerson) {
      await this.legalPersonUseCase.validatePerson(data.LegalPerson);
    } else if (data.NaturalPerson) {
      await this.naturalPersonUseCase.valitePerson(data.NaturalPerson);
    }

    const senderExist = await this.senderRepository.findSender({
      legalPerson: { legalPersonId: data.legal_person_id },
      naturalPerson: { naturalPersonId: data.natural_person_id },
    });

    if (senderExist) {
      throw new GraphQLError('SENDER ALREADY CREATED', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const newSender = new Sender({
      created_by: data.created_by,
      updated_by: data.updated_by,
      legal_person_id: data.legal_person_id,
      natural_person_id: data.natural_person_id,
    });
    console.log(newSender);

    if (data.LegalPerson) {
      const legalPersonEntity = LegalPersonEntityDto.createEntity(
        data.LegalPerson,
      );

      return this.senderRepository.createSender(newSender, legalPersonEntity);
    } else if (data.NaturalPerson) {
      const naturalPersonEntity = NaturalPersonEntityDto.createEntity(
        data.NaturalPerson,
      );

      return this.senderRepository.createSender(
        newSender,
        null,
        naturalPersonEntity,
      );
    }

    return this.senderRepository.createSender(newSender);
  }

  async updateSender(id: string, data: UpdateSenderDTO) {
    let naturalperson: NaturalPerson;
    let legalPerson: LegalPerson;
    if (!data.LegalPerson && !data.NaturalPerson)
      throw new GraphQLError('IS NECESSARY SEND DATA', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    const senderExist = await this.getSender({ id });
    if (!senderExist)
      throw new GraphQLError('SENDER NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    else if (data.LegalPerson && senderExist.natural_person_id)
      throw new GraphQLError('THIS SENDER IS NOT LEGAL CLIENT', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    else if (data.NaturalPerson && senderExist.legal_person_id)
      throw new GraphQLError('THIS SENDER IS NOT NATURAL PERSON', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    else if (data.LegalPerson && data.NaturalPerson)
      throw new GraphQLError(
        'YOU CAN ONLY PASS ONE NATURAL PERSON OR LEGAL ENTITY AND NOT BOTH AT THE SAME TIME',
        {
          extensions: { code: HttpStatus.CONFLICT },
        },
      );
    else if (data.NaturalPerson)
      naturalperson = await this.naturalPersonUseCase.valitePerson({
        cpf: data.NaturalPerson.cpf,
        rg: data.NaturalPerson.rg,
      });
    else if (data.LegalPerson)
      legalPerson = await this.legalPersonUseCase.validatePerson(
        data.LegalPerson,
      );
    const updateSender = new Sender({
      created_by: null,
      updated_by: data.updated_by,
      legal_person_id: legalPerson?.id,
      natural_person_id: naturalperson?.id,
    });

    if (data.LegalPerson) {
      const legalPersonEntity = LegalPersonEntityDto.updateEntity(
        data.LegalPerson,
      );

      return this.senderRepository.updateSender(
        id,
        updateSender,
        legalPersonEntity,
      );
    } else if (data.NaturalPerson) {
      const naturalPersonEntity = NaturalPersonEntityDto.updateEntity(
        data.NaturalPerson,
      );

      return this.senderRepository.updateSender(
        id,
        updateSender,
        null,
        naturalPersonEntity,
      );
    }
  }
}
