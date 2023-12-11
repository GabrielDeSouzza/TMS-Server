import { Field, ObjectType } from '@nestjs/graphql';

import { type ILegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

import { InvoiceForLegalClientModel } from '../InvoiceForLegalClientGraphql/InvoiceForLegalClient.model';
import { LegalClientMerchandiseModel } from '../LegalClientMerchandiseGraphql/LegalClientMerchandise.model';
import {
  LegalContractModel,
  type LegalContractReferences,
} from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';

@ObjectType()
export class LegalClientOrderModel implements ILegalClientOrder {
  @Field()
  id?: string;
  @Field()
  order: string;
  @Field()
  legal_contract_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at?: Date;
  @Field()
  created_by: string;
  @Field()
  updated_by: string;
  @Field(() => [LegalClientMerchandiseModel])
  Merchandises: [LegalClientMerchandiseModel];
  @Field(() => LegalContractModel)
  LegalContract: LegalContractReferences;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;
  @Field(() => [InvoiceForLegalClientModel])
  Invoices = [InvoiceForLegalClientModel];
}
