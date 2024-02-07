import { Injectable } from '@nestjs/common';

import { type GetLegalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetLegalPersonDto';
import {
  type ValidateLegalPersonDTO,
  type FindAllLegalPersonWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalPersonRepository';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { PrismaService } from '../prisma.service';
import { LegalPersonPrismaDTO } from './prismaDTO/LegalPersonPrismaDto';

@Injectable()
export class LegalPersonPrismaService implements LegalPersonRepository {
  constructor(private prisma: PrismaService) {}

  async findlegalperson(request: GetLegalPersonDTO): Promise<LegalPerson> {
    const legalPersonPrisma = await this.prisma.legalPerson.findFirst({
      where: {
        OR: [
          { cnpj: request.cnpj },
          { corporate_name: request.corporateName },
          { fantasy_name: request.fantasyName },
          { id: request.legalPersonId },
        ],
      },
    });

    return LegalPersonPrismaDTO.PrismaToEntity(legalPersonPrisma);
  }
  async getAllLegalPerson(
    parameters: FindAllLegalPersonWhereRequestDTO,
  ): Promise<LegalPerson[]> {
    const legalPerson = await this.prisma.legalPerson.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return legalPerson.map(legalPerson =>
      LegalPersonPrismaDTO.PrismaToEntity(legalPerson),
    );
  }

  async ValideLegalPerson(data: ValidateLegalPersonDTO): Promise<LegalPerson> {
    const legalPerson = await this.prisma.legalPerson.findFirst({
      where: {
        OR: [
          { cnpj: data.cnpj },
          {
            state_registration: data.state_registration,
          },
          { corporate_name: data.corporate_name },
          { fantasy_name: data.fantasy_name },
        ],
      },
    });

    return legalPerson
      ? LegalPersonPrismaDTO.PrismaToEntity(legalPerson)
      : null;
  }
}
