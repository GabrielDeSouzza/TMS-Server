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
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { CarrierCompanyWhereArgs } from 'infra/graphql/args/CarrierCompanyArgs';
import { GetCarrierCompanyArgs } from 'infra/graphql/args/GetLegalPersons/GetCarrierCompanyArgs';
import { LegalPersonGraphqlDTO } from 'infra/graphql/DTO/LegalPersonGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  CarrierCompanyInput,
  CarrierCompanyUpdateInput,
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
    private legalPersonRepository: LegalPersonRepository,
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
    @Args('carrierCompanyInput') carrierCompanyInput: CarrierCompanyInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.created_by = user.id;
    carrierCompanyInput.updated_by = user.id;

    return this.carrierCompanyUseCase.createCarrierCompany({
      CarrierCompany: carrierCompanyInput,
      LegalPerson: carrierCompanyInput.LegalPerson,
    });
  }
  @Mutation(() => CarrierCompanyModel)
  async updateCarriercompany(
    @Args('id') id: string,
    @Args('carrierCompanyInput') carrierCompanyInput: CarrierCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.updated_by = user.id;

    return await this.carrierCompanyUseCase.updateCarierCompany(id, {
      CarrierCompany: carrierCompanyInput,
      LegalPerson: carrierCompanyInput.LegalPerson,
    });
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(
    @Parent() legalClient: CarrierCompanyInput | CarrierCompanyUpdateInput,
  ) {
    const { legalPersonId: legalPersonID } = legalClient;
    const legalPerson = await this.legalPersonRepository.findlegalpersonById(
      legalPersonID,
    );

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
    console.log(updatedBy);

    return await this.userCase.getUser({ id: updatedBy });
  }
}
