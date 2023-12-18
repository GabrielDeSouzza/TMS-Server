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
import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CarrierCompanyGraphqlDTO } from 'infra/graphql/DTO/CarrierCompanyGraphqlDto';
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
    private carrierCompanyRepository: CarrierCompanyRepository,
    private userRepository: UserRepository,
    private legalPersonRepository: LegalPersonRepository,
  ) {}
  @Query(() => CarrierCompanyModel)
  async getCarrierCompanyModel(@Args('id') id: string) {
    return this.carrierCompanyRepository.findCarrierCompanyById(id);
  }
  @Query(() => [CarrierCompanyModel], { nullable: true })
  async getAllCarrierCompany() {
    const carrierCompany =
      await this.carrierCompanyRepository.getAllCarrierCompany();

    return carrierCompany.length > 0 ? carrierCompany : null;
  }
  @Mutation(() => CarrierCompanyModel)
  async createCarrierCompany(
    @Args('carrierCompanyInput') carrierCompanyInput: CarrierCompanyInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.created_by = user.id;
    carrierCompanyInput.updated_by = user.id;
    const carrierCompanyEntity =
      CarrierCompanyGraphqlDTO.createInputToEntity(carrierCompanyInput);
    const legalPersonEntity = carrierCompanyInput.LegalPerson
      ? LegalPersonGraphqlDTO.createInputToEntity(
          carrierCompanyInput.LegalPerson,
        )
      : null;

    return this.carrierCompanyRepository.createCarrierCompany(
      carrierCompanyEntity,
      legalPersonEntity,
      carrierCompanyInput.legalPersonId,
    );
  }
  @Mutation(() => CarrierCompanyModel)
  async updateCarriercompany(
    @Args('id') id: string,
    @Args('carrierCompanyInput') carrierCompanyInput: CarrierCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    carrierCompanyInput.updated_by = user.id;
    const carrierCompanyEntity =
      CarrierCompanyGraphqlDTO.updateInputToEntity(carrierCompanyInput);
    const legalPersonEntity = LegalPersonGraphqlDTO.updateInputToEntity(
      carrierCompanyInput.LegalPerson,
    );

    return this.carrierCompanyRepository.updateCarrierCompany(
      id,
      carrierCompanyEntity,
      legalPersonEntity,
    );
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
  async createdUser(@Parent() user: CarrierCompanyInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: CarrierCompanyInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}