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
import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { VehicleBodyworkWhereArgs } from 'infra/graphql/args/VehicleBodyworkArgs';
import { VehicleBodyworkGraphDTO } from 'infra/graphql/DTO/VehicleBodywork';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  VehicleBodyworkInput,
  VehicleBodyworkUpdateInput,
} from './vehicle-bodywork.input';
import { VehicleBodyworkModel } from './vehicle-bodywork.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleBodyworkModel)
export class VehicleBodyworkResolver {
  constructor(
    private vehicleBodyworkRepository: VehicleBodyworkRepository,
    private userCase: UserUseCases,
  ) {}
  @Query(() => VehicleBodyworkModel)
  async getVehicleBodyworkModel(@Args('id') id: string) {
    return this.vehicleBodyworkRepository.findVehicleBodywork({ id });
  }
  @Query(() => [VehicleBodyworkModel], { nullable: true })
  async getAllVehicleBodywork(@Args() args: VehicleBodyworkWhereArgs) {
    const bodyworks =
      await this.vehicleBodyworkRepository.getAllVehicleBodywork({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return bodyworks.length > 0 ? bodyworks : null;
  }
  @Mutation(() => VehicleBodyworkModel)
  async createVehicleBodywork(
    @Args('vehicleBodyworkInput') vehicleBodyworkInput: VehicleBodyworkInput,
    @CurrentUser() user: User,
  ) {
    vehicleBodyworkInput.created_by = user.id;
    vehicleBodyworkInput.updated_by = user.id;
    const vehicleBodyworkEntity =
      VehicleBodyworkGraphDTO.createcreateInputToEntity(vehicleBodyworkInput);

    return this.vehicleBodyworkRepository.createVehicleBodywork(
      vehicleBodyworkEntity,
    );
  }
  @Mutation(() => VehicleBodyworkModel)
  async updateVehicleBodywork(
    @Args('id') id: string,
    @Args('vehicleBodyworkIUpdate')
    vehicleBodyworkUpdated: VehicleBodyworkUpdateInput,
    @CurrentUser() user: User,
  ) {
    vehicleBodyworkUpdated.updated_by = user.id;
    const vehicleBodyworkEntity = VehicleBodyworkGraphDTO.updateInputToEntity(
      vehicleBodyworkUpdated,
    );

    return this.vehicleBodyworkRepository.updateVehicleBodywork(
      id,
      vehicleBodyworkEntity,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: VehicleBodyworkInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: VehicleBodyworkInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
