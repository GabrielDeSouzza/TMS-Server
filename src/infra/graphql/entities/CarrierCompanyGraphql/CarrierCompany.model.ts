import { Field, ObjectType } from '@nestjs/graphql';

import { type ICarrierCompany } from 'domain/entities/legalPerson/carrierCompany/CarrierCompany';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class CarrierCompanyModel implements ICarrierCompany {
  @Field()
  id?: string;
  @Field()
  legalPersonId: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => LegalPersonModel)
  LegalPerson: LegalPersonModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
