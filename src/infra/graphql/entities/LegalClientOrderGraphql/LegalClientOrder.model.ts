import { Field, Float, ObjectType } from '@nestjs/graphql';

import { type ILegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { FreightExpenseOrderModel } from '../FreightExpenseGraphql/FreightExpense.model';
import { LegalClientQuoteTableModel } from '../LegalClientQuoteTableGraphql/LegalClientQuoteTable.model';
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
  @Field()
  carrier_id: string;
  @Field(() => Float, { nullable: true })
  total_shipping_cost?: number;
  @Field(() => Float, { nullable: true })
  total_receivable?: number;
  @Field(() => Float, { nullable: true })
  total_tax_payable?: number;
  @Field(() => LegalContractModel)
  LegalContract: LegalContractReferences;
  @Field(() => UserModelRefereces)
  CreatedUser: UserModelRefereces;
  @Field(() => UserModelRefereces)
  UpdatedUser: UserModelRefereces;

  @Field()
  quote_table_id: string;
  @Field(() => LegalClientQuoteTableModel)
  Quote: LegalClientQuoteTableModel;

  @Field(() => CarrierCompanyModel)
  CarrierCompany: CarrierCompanyModel;
  @Field(() => Float)
  calculate_cofins?: number;
  @Field(() => Float)
  calculated_pis?: number;
  @Field(() => Float)
  cofins_tax?: number;
  @Field(() => Float)
  calculate_icms?: number;
  @Field(() => Float)
  pis_tax?: number;
  @Field(() => Float)
  icms_tax?: number;

  @Field(() => [FreightExpenseOrderModel], { nullable: true })
  expenses?: FreightExpenseOrderModel[];
}
