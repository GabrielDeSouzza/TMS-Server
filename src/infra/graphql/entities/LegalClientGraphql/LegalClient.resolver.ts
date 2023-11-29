import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/user/User';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { LegalClientGraphDTO } from 'infra/graphql/DTO/LegalClient';
import { LegalPersonGraphqlDTO } from 'infra/graphql/DTO/LegalPersonGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { LegalClientInput, LegalClientUpdateInput } from './LegalClient.input';
import { LegalClientModel } from './LegalClient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientModel)
export class LegalClientResolver {
  constructor(
    private legalClientRepository: LegalClientRepository,
    private userRepository: UserRepository,
    private legalPersonRepository: LegalPersonRepository,
  ) {}
  @Query(() => LegalClientModel)
  async getLegalClientModel(@Args('id') id: string) {
    return await this.legalClientRepository.findLegalClientById(id);
  }
  @Query(() => [LegalClientModel], { nullable: true })
  async getAllLegalClient() {
    const legalclient = await this.legalClientRepository.getAllLegalClient();

    return legalclient.length > 0 ? legalclient : null;
  }
  @Mutation(() => LegalClientModel)
  async createLegalClient(
    @Args('legalclientInput') legalclientInput: LegalClientInput,
    @CurrentUser() user: User,
  ) {
    legalclientInput.created_by = user.id;
    legalclientInput.updated_by = user.id;
    const legalclientEntity =
      LegalClientGraphDTO.createInputToEntity(legalclientInput);
    const legalPersonEntity = LegalPersonGraphqlDTO.createInputToEntity(
      legalclientInput.LegalPerson,
    );
    console.log('tess');

    return await this.legalClientRepository.createLegalClient(
      legalclientEntity,
      legalPersonEntity,
      legalclientInput.legal_person_id,
    );
  }
  @Mutation(() => LegalClientModel)
  async updatelegalclient(
    @Args('id') id: string,
    @Args('legalclientInput') legalclientInput: LegalClientUpdateInput,
    @CurrentUser() user: User,
  ) {
    legalclientInput.updated_by = user.id;
    const legalclientEntity =
      LegalClientGraphDTO.updateInputToEntity(legalclientInput);
    const legalPersonEntity = LegalPersonGraphqlDTO.updateInputToEntity(
      legalclientInput.LegalPerson,
    );

    return await this.legalClientRepository.updateLegalClient(
      id,
      legalclientEntity,
      legalPersonEntity,
    );
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(
    @Parent() legalClient: LegalClientInput | LegalClientUpdateInput,
  ) {
    const { legal_person_id: legalPersonID } = legalClient;
    const legalPerson = await this.legalPersonRepository.findlegalpersonById(
      legalPersonID,
    );

    return LegalPersonGraphqlDTO.createInputToEntity(legalPerson);
  }

  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: LegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: LegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
