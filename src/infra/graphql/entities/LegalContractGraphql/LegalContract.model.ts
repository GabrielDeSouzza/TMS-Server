import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { type ILegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

import {
  CarrierCompanyModel,
  CarrierCompanyModelRefereces,
} from '../CarrierCompanyGraphql/CarrierCompany.model';
import {
  LegalClientModel,
  LegalClientModelRefereces,
} from '../LegalClientGraphql/LegalClient.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class LegalContractModel implements ILegalContract {
  @Field()
  id?: string;
  @Field()
  contract_number: string;
  @Field()
  legal_client_id: string;
  @Field()
  carrier_company_id: string;
  @Field()
  observations?: string;
  @Field()
  effective_date: Date;
  @Field()
  delivery_conditions: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at?: Date;
  @Field()
  created_by: string;
  @Field(() => LegalClientModel)
  LegalClient: LegalClientModelRefereces;
  @Field(() => CarrierCompanyModel)
  CarrierCompany: CarrierCompanyModelRefereces;
  @Field()
  updated_by: string;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
@ObjectType()
export class LegalContractReferences extends OmitType(LegalClientModel, [
  'CreatedUser',
  'UpdatedUser',
  'created_at',
  'created_by',
  'updated_at',
  'updated_by',
]) {}
