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
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { VehicleBrandGraphDTO } from 'infra/graphql/DTO/VehicleBrand';
import { VehicleBrandWhereArgs } from 'infra/graphql/entities/VehicleBrandGraphql/Args/WhereVehicleBrandArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import {
  VehicleBrandInput,
  VehicleBrandUpdateInput,
} from './vehicle-brand.input';
import { VehicleBrandModel } from './vehicle-brand.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleBrandModel)
export class VehicleBrandResolver {
  constructor(
    private vehicleBrandRepository: VehicleBrandRepository,
    private userCase: UserUseCases,
  ) {}

  @Query(() => VehicleBrandModel)
  async getVehicleBrand(@Args('id') id: string) {
    return await this.vehicleBrandRepository.findVehicleBrand({ id });
  }
  @Query(() => [VehicleBrandModel])
  async getAllVehicleBrand(@Args() args: VehicleBrandWhereArgs) {
    const brands = await this.vehicleBrandRepository.getAllVehicleBrand({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });

    return brands.length > 0 ? brands : null;
  }
  @Mutation(() => VehicleBrandModel)
  async createVehicleBrand(
    @Args('vehicleBrandInput') vehicleBrandInput: VehicleBrandInput,
    @CurrentUser() user: User,
  ) {
    vehicleBrandInput.created_by = user.id;
    vehicleBrandInput.updated_by = user.id;
    const vehicleBrandEntity =
      VehicleBrandGraphDTO.createcreateInputToEntity(vehicleBrandInput);

    return await this.vehicleBrandRepository.createVehicleBrand(
      vehicleBrandEntity,
    );
  }

  @Mutation(() => VehicleBrandModel)
  async updatedVehicleBrand(
    @Args('id') id: string,
    @Args('vehicleBrandUpdate') vehicleBrandUpdate: VehicleBrandUpdateInput,
    @CurrentUser() user: User,
  ) {
    vehicleBrandUpdate.updated_by = user.id;
    const vehicleBrandEntity =
      VehicleBrandGraphDTO.updateInputToEntity(vehicleBrandUpdate);

    return this.vehicleBrandRepository.updateVehicleBrand(
      id,
      vehicleBrandEntity,
    );
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
