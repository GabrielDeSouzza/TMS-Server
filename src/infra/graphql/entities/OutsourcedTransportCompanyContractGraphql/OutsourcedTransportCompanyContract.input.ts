import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsString } from 'class-validator';

import { type IOutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

@InputType()
export class OutsourcedTransportCompanyContractInput
  implements
    Omit<
      IOutsourcedTransportCompanyContract,
      'id' | 'created_at' | 'updated_at'
    >
{
  @HideField()
  @Allow()
  contractNumber: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  outSourcedTransportCompanyId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  carrierCompanyId: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  legalClientOrderId: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class OutsourcedTransportCompanyContractUpdateInput extends PartialType(
  OutsourcedTransportCompanyContractInput,
) {}
