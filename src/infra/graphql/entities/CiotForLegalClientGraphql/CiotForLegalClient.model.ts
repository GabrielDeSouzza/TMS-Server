import { Field, ObjectType } from '@nestjs/graphql';

import { type ICiotForLegalClient } from 'domain/entities/legalClientEntities/CiotForLegalPerson/CiotForLegalClient';

import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class CiotForLegalClientModel implements ICiotForLegalClient {
  @Field()
  id: string;
  @Field()
  ciot: string;
  @Field(() => Date)
  emission_date: Date;
  @Field()
  legal_contract_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;

  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => LegalContractModel)
  LegalClientContract: LegalContractModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
