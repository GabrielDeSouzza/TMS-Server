import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class OutsourcedTransportCompanyModel
  implements IOutsourcedTransportCompany
{
  @Field()
  id?: string;
  @Field()
  legalPersonId: string;
  @Field(() => LegalPersonModel)
  LegalPerson: LegalPersonModel;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
