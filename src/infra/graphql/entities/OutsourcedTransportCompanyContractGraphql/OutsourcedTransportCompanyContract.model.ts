import { Field, ObjectType } from '@nestjs/graphql';

import { type IOutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class OutsourcedTransportCompanyContractModel
  implements IOutsourcedTransportCompanyContract
{
  @Field()
  contractNumber: string;
  @Field()
  outSourcedTransportCompanyId: string;
  @Field()
  carrierCompanyId: string;
  @Field()
  legalClientOrderId: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
  @Field()
  id?: string;

  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => CarrierCompanyModel)
  CarrierCompany: CarrierCompanyModel;
  @Field(() => LegalClientOrderModel)
  LegalClientOrder: LegalClientOrderModel;
  @Field(() => OutsourcedTransportCompanyModel)
  OutsourcedTransportCompany: OutsourcedTransportCompanyContractModel;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
}
