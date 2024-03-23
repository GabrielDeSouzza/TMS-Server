import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetRecipientDTO } from 'domain/dto/repositories/getDataDtos/GetRecipientDto';
import { type FindAllRecipientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RecipientRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { Recipient } from 'domain/entities/Recipient/Recipient';
import { RecipientRepository } from 'domain/repositories/RecipientRepository ';

import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';
import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type CreateRecipientDTO } from 'app/dtos/RecipientDto/CreateRecipientDto';
import { type UpdateRecipientDTO } from 'app/dtos/RecipientDto/UpdateRecipientDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';
import { NaturalPersonUseCases } from '../NaturalPersoUseCases/NaturalPersonUseCases';

@Injectable()
export class RecipientUseCases {
  constructor(
    private recipientRepository: RecipientRepository,
    private legalPersonUseCase: LegalPersonUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  async getRecipient(request: GetRecipientDTO) {
    if (!request.legalPerson && !request.id && !request.naturalPerson) {
      throw new GraphQLError(
        'IS NECESSARY AN ID, NATURAL PERSON OR LEGAL PERSON DATA',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    }

    const recipient = await this.recipientRepository.findRecipient(request);
    if (recipient) return recipient;

    throw new GraphQLError('RECIPIENT NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllRecipient(request: FindAllRecipientWhereRequestDTO) {
    return this.recipientRepository.findAllRecipient(request);
  }
  async createRecipient(data: CreateRecipientDTO) {
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

    const recipientExist = await this.recipientRepository.findRecipient({
      legalPerson: { legalPersonId: data.legal_person_id },
      naturalPerson: { naturalPersonId: data.natural_person_id },
    });

    if (recipientExist) {
      throw new GraphQLError('RECIPIENT ALREADY CREATED', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const newRecipient = new Recipient({
      created_by: data.created_by,
      updated_by: data.updated_by,
      legal_person_id: data.legal_person_id,
      natural_person_id: data.natural_person_id,
    });

    if (data.LegalPerson) {
      const legalPersonEntity = LegalPersonEntityDto.createEntity(
        data.LegalPerson,
      );

      return this.recipientRepository.createRecipient(
        newRecipient,
        legalPersonEntity,
      );
    } else if (data.NaturalPerson) {
      const naturalPersonEntity = NaturalPersonEntityDto.createEntity(
        data.NaturalPerson,
      );

      return this.recipientRepository.createRecipient(
        newRecipient,
        null,
        naturalPersonEntity,
      );
    }

    return this.recipientRepository.createRecipient(newRecipient);
  }

  async updateRecipient(id: string, data: UpdateRecipientDTO) {
    let naturalperson: NaturalPerson;
    let legalPerson: LegalPerson;
    if (!data.LegalPerson && !data.NaturalPerson)
      throw new GraphQLError('IS NECESSARY SEND DATA', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    const recipientExist = await this.getRecipient({ id });
    if (!recipientExist)
      throw new GraphQLError('RECIPIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    else if (data.LegalPerson && recipientExist.natural_person_id)
      throw new GraphQLError('THIS RECIPIENT IS NOT LEGAL CLIENT', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    else if (data.NaturalPerson && recipientExist.legal_person_id)
      throw new GraphQLError('THIS RECIPIENT IS NOT NATURAL PERSON', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    if (data.LegalPerson && data.NaturalPerson)
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
    const updateRecipient = new Recipient({
      created_by: null,
      updated_by: data.updated_by,
      legal_person_id: legalPerson?.id,
      natural_person_id: naturalperson?.id,
    });

    if (data.LegalPerson) {
      const legalPersonEntity = LegalPersonEntityDto.updateEntity(
        data.LegalPerson,
      );

      return this.recipientRepository.updateRecipient(
        id,
        updateRecipient,
        legalPersonEntity,
      );
    } else if (data.NaturalPerson) {
      const naturalPersonEntity = NaturalPersonEntityDto.updateEntity(
        data.NaturalPerson,
      );

      return this.recipientRepository.updateRecipient(
        id,
        updateRecipient,
        null,
        naturalPersonEntity,
      );
    }
  }
}
