import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { ManifestUseCases } from 'app/useCases/ManifestUseCases/ManifestUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetManifestArgs } from './Args/GetManifestArgs';
import { ManifestCountArgs, ManifestWhereArgs } from './Args/WhereManifestArgs';
import { ManifestInput } from './Manifest.input';
import { ManifestModel } from './Manifest.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => ManifestModel)
export class ManifestResolver {
  constructor(private manifestUseCase: ManifestUseCases) {}
  @Query(() => Int)
  async countManifest(@Args() request: ManifestCountArgs) {
    return this.manifestUseCase.countManifest({ where: request.where });
  }
  @Query(() => ManifestModel)
  async getManifest(@Args() request: GetManifestArgs) {
    return this.manifestUseCase.getManifest(request);
  }
  @Query(() => [ManifestModel], { nullable: true })
  async getAllManifest(@Args() args: ManifestWhereArgs) {
    return await this.manifestUseCase.getAllManifest(args);
  }
  @Mutation(() => ManifestModel)
  async createManifest(
    @Args('data')
    manifestInput: ManifestInput,
  ) {
    return this.manifestUseCase.createManifest(manifestInput);
  }
}
