import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

export abstract class NaturalPersonRepository {
  abstract findNaturalPersonByIdOrCpf(
    id?: string,
    cpf?: string,
  ): Promise<NaturalPerson>;
  abstract createNaturalPerson(
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson>;
  abstract updateNaturalPerson(
    id: string,
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson>;
}