import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonWhereArgs } from './Args/WhereLegalPersonArgs';
import { LegalPersonModel } from './LegalPerson.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalPersonModel)
export class LegalPersonResolver {
  constructor(private legalPersonUseCase: LegalPersonUseCases) {}

  @Query(() => [LegalPersonModel], { nullable: true })
  async getAllLegalPerson(@Args() args: LegalPersonWhereArgs) {
    const legalperson = await this.legalPersonUseCase.getAllLegalPerson({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });

    return legalperson.length > 0 ? legalperson : null;
  }
}
