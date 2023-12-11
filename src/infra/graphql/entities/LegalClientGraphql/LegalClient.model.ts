import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type ILegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class LegalClientModel implements ILegalClient {
  @Field()
  id?: string;
  @Field()
  branch: string;
  @Field()
  legal_person_id: string;
  @Field(() => LegalPersonModel)
  LegalPerson: LegalPersonModel;

  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at?: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => [LegalClientOrderModel])
  Orders: [LegalClientOrderModel];
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
@ObjectType()
export class LegalClientModelRefereces extends OmitType(LegalClientModel, [
  'updated_at',
  'updated_by',
  'created_by',
  'created_at',
  'UpdatedUser',
  'CreatedUser',
]) {}
