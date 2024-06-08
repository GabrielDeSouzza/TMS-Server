import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonWhereArgs } from './Args/WhereNaturalPersonArgs';
import { NaturalPersonModel } from './NaturalPerson.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => NaturalPersonModel)
export class NaturalPersonResolver {
  constructor(private naturalPersonUseCase: NaturalPersonUseCases) {}

  @Query(() => [NaturalPersonModel], { nullable: true })
  async getAllNaturalPerson(@Args() args: NaturalPersonWhereArgs) {
    const naturalperson = await this.naturalPersonUseCase.getAllNaturalPersons({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });

    return naturalperson.length > 0 ? naturalperson : null;
  }
}
