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

import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleBrandUseCases } from 'app/useCases/VehicleBrandCases/VehicleBrandUseCases';

import {
  VehicleBrandCountArgs,
  VehicleBrandWhereArgs,
} from 'infra/graphql/entities/VehicleBrandGraphql/Args/WhereVehicleBrandArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetVehicleBrandArgs } from './Args/GetVehicleBrandArgs';
import {
  VehicleBrandInput,
  VehicleBrandUpdateInput,
  VehicleBrandUpdateManyInput,
} from './vehicle-brand.input';
import { VehicleBrandModel } from './vehicle-brand.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleBrandModel)
export class VehicleBrandResolver {
  constructor(
    private vehicleBrandUseCase: VehicleBrandUseCases,
    private userCase: UserUseCases,
  ) {}

  @Query(() => Number)
  async totalVehicleBrands(@Args() request: VehicleBrandCountArgs) {
    const vehicleBrand = await this.vehicleBrandUseCase.count(request);

    return vehicleBrand;
  }

  @Query(() => VehicleBrandModel)
  async getVehicleBrand(@Args() request: GetVehicleBrandArgs) {
    return await this.vehicleBrandUseCase.getVehicleBrand(request);
  }

  @Query(() => [VehicleBrandModel])
  async getAllVehicleBrand(@Args() args: VehicleBrandWhereArgs) {
    const brands = await this.vehicleBrandUseCase.getAllVehicleBrand(args);

    return brands;
  }

  @Mutation(() => VehicleBrandModel)
  async createVehicleBrand(
    @Args('vehicleBrandInput') vehicleBrandInput: VehicleBrandInput,
    @CurrentUser() user: User,
  ) {
    vehicleBrandInput.created_by = user.id;
    vehicleBrandInput.updated_by = user.id;

    return await this.vehicleBrandUseCase.createBrand(vehicleBrandInput);
  }

  @Mutation(() => VehicleBrandModel)
  async updatedVehicleBrand(
    @Args('id') id: string,
    @Args('vehicleBrandUpdate') vehicleBrandUpdate: VehicleBrandUpdateInput,
    @CurrentUser() user: User,
  ) {
    vehicleBrandUpdate.updated_by = user.id;

    return this.vehicleBrandUseCase.updateBrand(id, vehicleBrandUpdate);
  }

  @Mutation(() => [VehicleBrandModel])
  async updateManyVehicleBrands(
    @Args({
      name: 'updateManyVehicleBrands',
      type: () => [VehicleBrandUpdateManyInput],
    })
    updateVehicleBrandInput: VehicleBrandUpdateManyInput[],
  ) {
    return await this.vehicleBrandUseCase.updateManyVehicleBrands(
      updateVehicleBrandInput,
    );
  }

  @Mutation(() => VehicleBrandModel)
  async deleteVehicleBrand(@Args('id', { type: () => String }) id: string) {
    return await this.vehicleBrandUseCase.deleteVehicleBrand(id);
  }

  @Mutation(() => [VehicleBrandModel])
  async deleteManyVehicleBrands(
    @Args({ name: 'deleteManyVehicleBrands', type: () => [String] })
    ids: string[],
  ) {
    return await this.vehicleBrandUseCase.deleteManyVehicleBrands(ids);
  }

  @ResolveField()
  async createdUser(@Parent() user: VehicleBrandInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }

  @ResolveField()
  async updatedUser(@Parent() user: VehicleBrandInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
