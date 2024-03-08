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

import { PhysicalCustomerMerchandiseUseCases } from 'app/useCases/PhysicalCustomerMerchandiseDto/PhysicalCustomerMerchandiseUseCases';
import { PhysicalCustomerOrderUseCases } from 'app/useCases/PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { PhysicalCustomerMerchandiseModel } from '../PhysicalCustomerMerchandiseGraphql/PhysicalCustomerMerchandise.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetPhysicalCustomerOrderArgs } from './Args/GetPhysicalCustomerOrderrArgs';
import { PhysicalCustomerOrderWhereArgs } from './Args/WherePhysicalCustomerOrderArgs';
import {
  PhysicalCustomerOrderInput,
  PhysicalCustomerOrderUpdateInput,
} from './PhysicalCustomerOrder.input';
import { PhysicalCustomerOrderModel } from './PhysicalCustomerOrder.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => PhysicalCustomerOrderModel)
export class PhysicalCustomerOrderResolver {
  constructor(
    private physicalCustomerOrderUseCase: PhysicalCustomerOrderUseCases,
    private userCase: UserUseCases,
    private physicalCustomerMerchandiseUseCase: PhysicalCustomerMerchandiseUseCases,
    private physicalCustomerUseCase: PhysicalCustomerUseCases,
  ) {}
  @Query(() => PhysicalCustomerOrderModel, { nullable: true })
  async getPhysicalCustomerOrderModel(
    @Args() request: GetPhysicalCustomerOrderArgs,
  ) {
    return this.physicalCustomerOrderUseCase.getPhysicalCustomerOrder(request);
  }
  @Query(() => [PhysicalCustomerOrderModel], { nullable: true })
  async getAllPhysicalCustomerOrder(
    @Args() args: PhysicalCustomerOrderWhereArgs,
  ) {
    return this.physicalCustomerOrderUseCase.getAllPhysicalCustomerOrder(args);
  }
  @Mutation(() => PhysicalCustomerOrderModel)
  async createPhysicalCustomerOrder(
    @Args('physicalCustomerOrderInput')
    physicalCustomerOrderInput: PhysicalCustomerOrderInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerOrderInput.created_by = user.id;
    physicalCustomerOrderInput.updated_by = user.id;

    return await this.physicalCustomerOrderUseCase.createOrder(
      physicalCustomerOrderInput,
    );
  }
  @Mutation(() => PhysicalCustomerOrderModel)
  async updatephysicalCustomerOrder(
    @Args('id') id: string,
    @Args('physicalCustomerOrderInput')
    physicalCustomerOrderInput: PhysicalCustomerOrderUpdateInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerOrderInput.updated_by = user.id;

    return await this.physicalCustomerOrderUseCase.updateOrder(
      id,
      physicalCustomerOrderInput,
    );
  }
  @ResolveField(() => PhysicalCustomerModel)
  async PhysicalCustomer(@Parent() order: PhysicalCustomerOrderInput) {
    console.log(order);

    return await this.physicalCustomerUseCase.getPhysicalCustomer({
      id: order.physicalCustomerId,
    });
  }
  @ResolveField(() => [PhysicalCustomerMerchandiseModel])
  async Merchandises(@Parent() order: PhysicalCustomerOrderModel) {
    const { id } = order;

    return this.physicalCustomerMerchandiseUseCase.getMerchandisesForOrder(id);
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: PhysicalCustomerOrderInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: PhysicalCustomerOrderInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
