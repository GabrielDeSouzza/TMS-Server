import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { type CreateLegalPersonDTO } from 'app/dtos/LegalPerson/CreateLegalPersonDto';

@Injectable()
export class LegalPersonUseCases {
  constructor(private legalPersonRepository: LegalPersonRepository) {}
  async validatePerson(data: CreateLegalPersonDTO) {
    const person = await this.legalPersonRepository.ValideLegalPerson({
      cnpj: data.cnpj,
      corporate_name: data.corporate_name,
      fantasy_name: data.fantasy_name,
      state_registration: data.state_registration,
    });

    if (person) {
      let errors = '';

      if (data.cnpj == person.cnpj) {
        errors += 'CNPJ IN USE;';
      }

      if (data.state_registration == person.state_registration) {
        errors += 'STATE REGISTRATION IN USE;';
      }

      if (data.fantasy_name == person.fantasy_name) {
        errors += ' FANTASY NAME IN USE;';
      }

      if (data.corporate_name == person.corporate_name) {
        errors += 'CORPORATE NAME IN USE';
      }

      if (errors.length > 0) {
        throw new GraphQLError(errors, {
          extensions: { code: HttpStatus.CONFLICT },
        });
      }
    }
  }
}
