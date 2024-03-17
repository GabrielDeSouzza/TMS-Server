import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { IcmsUseCases } from 'app/useCases/IcmsUseCase/IcmsUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetIcmsArgs } from './Args/GetIcmsArgs';
import { IcmsWhereArgs } from './Args/WhereIcmsArgs';
import { IcmsInput, IcmsUpdateInput } from './Icms.input';
import { IcmsModel } from './Icms.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => IcmsModel)
export class IcmsResolver {
  constructor(
    private IcmsUseCase: IcmsUseCases,
    private userCase: UserUseCases,
  ) {}
  @Query(() => IcmsModel)
  async getICMS(@Args() request: GetIcmsArgs) {
    console.log(request);

    return this.IcmsUseCase.getIcms({
      id: request.id,
      stateRelationIcms: {
        recipient_state: request.StateRelation.recipient_state,
        state_origin: request.StateRelation.state_origin,
      },
    });
  }
  @Query(() => [IcmsModel], { nullable: true })
  async getAllICMS(@Args() args: IcmsWhereArgs) {
    const icms = await this.IcmsUseCase.getAllIcms(args);

    return icms.length > 0 ? icms : null;
  }
  @Mutation(() => IcmsModel)
  async createIcms(
    @Args('data')
    IcmsInput: IcmsInput,
    @CurrentUser() user: User,
  ) {
    IcmsInput.created_by = user.id;
    IcmsInput.updated_by = user.id;

    return this.IcmsUseCase.createIcms(IcmsInput);
  }
  @Mutation(() => IcmsModel)
  async updateIcms(
    @Args('id') id: string,
    @Args('invoiceForLegalClientInput')
    IcmsInput: IcmsUpdateInput,
    @CurrentUser() user: User,
  ) {
    IcmsInput.updated_by = user.id;

    return this.IcmsUseCase.updateIcms(id, IcmsInput);
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: IcmsInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: IcmsInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
