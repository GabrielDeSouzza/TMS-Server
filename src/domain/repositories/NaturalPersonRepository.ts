import {
  type INaturalPerson,
  type NaturalPerson,
} from 'domain/entities/personEntities/naturalPerson/NaturalPerson';

export abstract class NaturalPersonRepository {
  abstract findNaturalPersonByIdOrCpf(
    id?: string,
    cpf?: string,
  ): Promise<NaturalPerson>;
  abstract createNaturalPerson(
    naturalPerson: Omit<INaturalPerson, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<NaturalPerson>;
  abstract updateNaturalPerson(
    id: string,
    naturalPerson: Partial<INaturalPerson>,
  ): Promise<NaturalPerson>;
}
