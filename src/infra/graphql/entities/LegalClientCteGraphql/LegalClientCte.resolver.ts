import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { LegalClientCteUseCase } from 'app/useCases/LegalClientCteUseCase/LegalClientCteUseCase';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetLegalClientCteArgs } from './Args/GetLegalClientCteArgs';
import { LegalClientCteWhereArgs } from './Args/GetLegalClientCteWhereArgs';
import {
  LegalClientCteInput,
  LegalClientCteUpdateInput,
} from './LegalClientCte.input';
import { LegalClientCteModel } from './LegalClientCte.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(LegalClientCteModel)
export class LegalClientCteResolver {
  constructor(private legalClientCteUseCase: LegalClientCteUseCase) {}
  @Query(() => LegalClientCteModel, { nullable: true })
  async getLegalClientCte(@Args() request: GetLegalClientCteArgs) {
    return await this.legalClientCteUseCase.getLegalClientCte(request);
  }
  @Query(() => [LegalClientCteModel])
  async getAllLegalClientCte(@Args() args: LegalClientCteWhereArgs) {
    return await this.legalClientCteUseCase.getAllLegalClientCte(args);
  }
  @Mutation(() => LegalClientCteModel)
  async createLegalClientCte(
    @Args('data') legalClientCteInput: LegalClientCteInput,
  ) {
    return await this.legalClientCteUseCase.createLegalClientCte(
      legalClientCteInput,
    );
  }
  @Mutation(() => LegalClientCteModel)
  async updateLegalClientCte(
    @Args('id') id: string,
    @Args('ownDriverUpdate')
    legalClientCteInput: LegalClientCteUpdateInput,
  ) {
    return this.legalClientCteUseCase.updateLegalClientCte(
      id,
      legalClientCteInput,
    );
  }
}
