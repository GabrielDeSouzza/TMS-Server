import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { type IOutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

@InputType()
export class OutsourcedTransportCompanyContractInput
  implements
    Omit<
      IOutsourcedTransportCompanyContract,
      'id' | 'created_at' | 'updated_at'
    >
{
  @Field()
  outSourcedTransportCompanyId: string;
  @Field()
  carrierCompanyId: string;
  @Field()
  legalClientOrderId: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyContractUpdateInput extends PartialType(
  OutsourcedTransportCompanyContractInput,
) {}
