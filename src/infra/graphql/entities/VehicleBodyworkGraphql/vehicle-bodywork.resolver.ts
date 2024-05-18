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
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { VehicleBodyworkGraphDTO } from 'infra/graphql/DTO/VehicleBodywork';
import {
  VehicleBodyworkCountArgs,
  VehicleBodyworkWhereArgs,
} from 'infra/graphql/entities/VehicleBodyworkGraphql/Args/WhereVehicleBodyworkArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
import { GetVehicleBodyWorkArgs } from './Args/GetVehicleBodyWorkArgs';
import {
  VehicleBodyworkInput,
  VehicleBodyworkUpdateInput,
  VehicleBodyworkUpdateManyInput,
} from './vehicle-bodywork.input';
import { VehicleBodyworkModel } from './vehicle-bodywork.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleBodyworkModel)
export class VehicleBodyworkResolver {
  constructor(
    private vehicleBodyworkRepository: VehicleBodyworkRepository,
    private vehicleTypeRepository: VehicleTypeRepository,
    private userCase: UserUseCases,
  ) {}

  @Query(() => Number)
  async totalVehicleBodyworks(@Args() request: VehicleBodyworkCountArgs) {
    const vehicleBodywork = await this.vehicleBodyworkRepository.count(request);

    return vehicleBodywork;
  }

  @Query(() => VehicleBodyworkModel)
  async getVehicleBodyworkModel(@Args() request: GetVehicleBodyWorkArgs) {
    return this.vehicleBodyworkRepository.findVehicleBodywork(request);
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

  @Mutation(() => [VehicleBodyworkModel])
  async updateManyVehicleBodyworks(
    @Args({
      name: 'updateManyVehicleBodyworks',
      type: () => [VehicleBodyworkUpdateManyInput],
    })
    updateVehicleBodyworkInput: VehicleBodyworkUpdateManyInput[],
  ) {
    return await this.vehicleBodyworkRepository.updateMany(
      updateVehicleBodyworkInput,
    );
  }

  @Mutation(() => VehicleBodyworkModel)
  async deleteVehicleBodywork(@Args('id', { type: () => String }) id: string) {
    return await this.vehicleBodyworkRepository.delete(id);
  }

  @Mutation(() => [VehicleBodyworkModel])
  async deleteManyVehicleBodyworks(
    @Args({ name: 'deleteManyVehicleBodyworks', type: () => [String] })
    ids: string[],
  ) {
    return await this.vehicleBodyworkRepository.deleteMany(ids);
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

  @ResolveField(() => VehicleTypeModel)
  async VehicleTypes(@Parent() bodywork: VehicleBodyworkModel) {
    const { id } = bodywork;
    console.log(
      await this.vehicleTypeRepository.getAllVehicleTypeByBodyWork(id),
    );

    return await this.vehicleTypeRepository.getAllVehicleTypeByBodyWork(id);
  }
}
