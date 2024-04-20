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

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { LegalPersonGraphqlDTO } from 'infra/graphql/DTO/LegalPersonGraphqlDto';
import { CarrierCompanyWhereArgs } from 'infra/graphql/entities/CarrierCompanyGraphql/Args/WhereCarrierCompanyArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetCarrierCompanyArgs } from './Args/GetCarrierCompanyArgs';
import {
  CarrierCompanyInput,
  CarrierCompanyUpdateInput,
  CarrierCompanyUpdateManyInput,
} from './CarrierCompany.input';
import { CarrierCompanyModel } from './CarrierCompany.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.ADMIN)
@Resolver(() => CarrierCompanyModel)
export class CarrierCompanyResolver {
  constructor(
    private carrierCompanyUseCase: CarrierCompanyUseCases,
    private userCase: UserUseCases,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  @Query(() => CarrierCompanyModel)
  async getCarrierCompanyModel(
    @Args() carrierCompanySearch: GetCarrierCompanyArgs,
  ) {
    return this.carrierCompanyUseCase.getCarrierCompany(carrierCompanySearch);
  }
  @Query(() => [CarrierCompanyModel], { nullable: true })
  async getAllCarrierCompany(@Args() args: CarrierCompanyWhereArgs) {
    const carrierCompany =
      await this.carrierCompanyUseCase.getAllCarrierCompany({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return carrierCompany.length > 0 ? carrierCompany : null;
  }
  @Mutation(() => CarrierCompanyModel)
  async createCarrierCompany(
    @Args('data') carrierCompanyInput: CarrierCompanyInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.created_by = user.id;
    carrierCompanyInput.updated_by = user.id;

    return this.carrierCompanyUseCase.createCarrierCompany(carrierCompanyInput);
  }
  @Mutation(() => CarrierCompanyModel)
  async updateCarriercompany(
    @Args('id') id: string,
    @Args('data') carrierCompanyInput: CarrierCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.updated_by = user.id;

    return await this.carrierCompanyUseCase.updateCarierCompany(
      id,
      carrierCompanyInput,
    );
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(
    @Parent() legalClient: CarrierCompanyInput | CarrierCompanyUpdateInput,
  ) {
    const { legalPersonId: legalPersonID } = legalClient;
    const legalPerson = await this.legalPersonUseCase.getLegalPerson({
      legalPersonId: legalPersonID,
    });

    return LegalPersonGraphqlDTO.createInputToEntity(legalPerson);
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: CarrierCompanyInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }

  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: CarrierCompanyModel) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }

  @Mutation(() => [CarrierCompanyModel])
  async updateManyCarrierCompanies(
    @Args({
      name: 'updateManyCarrierCompanies',
      type: () => [CarrierCompanyUpdateManyInput],
    })
    updateUserInput: CarrierCompanyUpdateManyInput[],
  ) {
    return await this.carrierCompanyUseCase.updateManyCarrierCompanies(
      updateUserInput,
    );
  }

  @Mutation(() => CarrierCompanyModel)
  async deleteCarrierCompany(@Args('id', { type: () => String }) id: string) {
    return await this.carrierCompanyUseCase.deleteCarrierCompany(id);
  }

  @Mutation(() => [CarrierCompanyModel])
  async deleteManyCarrierCompanies(
    @Args({ name: 'deleteManyCarrierCompanies', type: () => [String] })
    ids: string[],
  ) {
    return await this.carrierCompanyUseCase.deleteManyCarrierCompanies(ids);
  }
}
