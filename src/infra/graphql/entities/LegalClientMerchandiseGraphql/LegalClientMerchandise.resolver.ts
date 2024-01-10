import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';
import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { LegalClientMerchandiseWhereArgs } from 'infra/graphql/args/LegalClientMerchandiseArgs';
import { LegalClientMerchandiseGraphqlDTO } from 'infra/graphql/DTO/LegalClientMerchandiseGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import {
  LegalClientMerchandiseInput,
  LegalClientMerchandiseUpdateInput,
} from './LegalClientMerchandise.input';
import { LegalClientMerchandiseModel } from './LegalClientMerchandise.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientMerchandiseModel)
export class LegalClientMerchandiseResolver {
  constructor(
    private legalClientMerchandiseRepository: LegalClientMerchandiseRepository,
    private legalClientOrderRepository: LegalClientOrderRepository,
  ) {}
  @Query(() => LegalClientMerchandiseModel)
  async getLegalClientMerchandiseModel(@Args('id') id: string) {
    return this.legalClientMerchandiseRepository.findLegalClientMerchandiseById(
      id,
    );
  }
  @Query(() => [LegalClientMerchandiseModel], { nullable: true })
  async getAllLegalClientMerchandise(
    @Args() args: LegalClientMerchandiseWhereArgs,
  ) {
    const legalClientMerchandise =
      await this.legalClientMerchandiseRepository.getAllLegalClientMerchandise({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return legalClientMerchandise.length > 0 ? legalClientMerchandise : null;
  }
  @Mutation(() => LegalClientMerchandiseModel)
  async createLegalClientMerchandise(
    @Args('legalClientMerchandiseInput')
    legalClientMerchandiseInput: LegalClientMerchandiseInput,
  ) {
    const legalClientMerchandiseEntity =
      LegalClientMerchandiseGraphqlDTO.createInputToEntity(
        legalClientMerchandiseInput,
      );

    return this.legalClientMerchandiseRepository.createLegalClientMerchandise(
      legalClientMerchandiseEntity,
    );
  }
  @Mutation(() => LegalClientMerchandiseModel)
  async updatelegalClientMerchandise(
    @Args('id') id: string,
    @Args('legalClientMerchandiseInput')
    legalClientMerchandiseInput: LegalClientMerchandiseUpdateInput,
  ) {
    const legalClientMerchandiseEntity =
      LegalClientMerchandiseGraphqlDTO.updateInputToEntity(
        legalClientMerchandiseInput,
      );

    return this.legalClientMerchandiseRepository.updateLegalClientMerchandise(
      id,
      legalClientMerchandiseEntity,
    );
  }
  @ResolveField(() => LegalClientOrderModel)
  async LegalClientOrder(@Parent() merchandise: LegalClientMerchandiseInput) {
    const { legalClientOrderId } = merchandise;

    return this.legalClientOrderRepository.findLegalClientOrderById(
      legalClientOrderId,
    );
  }
}
