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

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';
import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';
import { RecipientUseCases } from 'app/useCases/RecipientUseCase /RecipientUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { GetRecipientArgs } from '../RecipientGraphql/Args/GetRecipientArgs';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { RecipientWhereArgs } from './Args/WhereRecipientArgs';
import { RecipientInput, RecipientUpdateInput } from './Recipient.input';
import { RecipientModel } from './Recipient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => RecipientModel)
export class RecipientResolver {
  constructor(
    private RecipientUseCase: RecipientUseCases,
    private userCase: UserUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  @Query(() => RecipientModel)
  async getRecient(@Args() request: GetRecipientArgs) {
    return this.RecipientUseCase.getRecipient(request);
  }
  @Query(() => [RecipientModel], { nullable: true })
  async getAllRecient(@Args() args: RecipientWhereArgs) {
    const recipient = await this.RecipientUseCase.getAllRecipient(args);

    return recipient.length > 0 ? recipient : null;
  }
  @Mutation(() => RecipientModel)
  async createRecipient(
    @Args('data')
    recipientInput: RecipientInput,
    @CurrentUser() user: User,
  ) {
    recipientInput.created_by = user.id;
    recipientInput.updated_by = user.id;

    return this.RecipientUseCase.createRecipient(recipientInput);
  }
  @Mutation(() => RecipientModel)
  async updateRecipient(
    @Args('id') id: string,
    @Args('data')
    recipent: RecipientUpdateInput,
    @CurrentUser() user: User,
  ) {
    recipent.updated_by = user.id;

    return this.RecipientUseCase.updateRecipient(id, recipent);
  }

  @ResolveField(() => NaturalPersonModel, { nullable: true })
  async NaturalPerson(@Parent() recipient: RecipientModel) {
    if (recipient.natural_person_id)
      return await this.naturalPersonUseCase.getNaturalPerson({
        naturalPersonId: recipient.natural_person_id,
      });
  }

  @ResolveField(() => LegalPersonModel, { nullable: true })
  async LegalPerson(@Parent() recipient: RecipientModel) {
    if (recipient.legal_person_id)
      return await this.legalPersonUseCase.getLegalPerson({
        legalPersonId: recipient.legal_person_id,
      });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: RecipientInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: RecipientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
