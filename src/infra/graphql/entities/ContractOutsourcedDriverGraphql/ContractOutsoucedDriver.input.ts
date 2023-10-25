import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type IContractOutsourcedDriver } from 'domain/entities/personEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

@InputType()
export class ContractOutsourcedDriverInput
  implements Omit<IContractOutsourcedDriver, 'updated_at' | 'created_at'>
{
  @Field({ nullable: true })
  id?: string;
  @Field()
  type: string;
  @Field()
  situation: string;
  @Field(() => Date)
  start_at: Date;
  @Field(() => Date)
  end_at?: Date;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
  @Field()
  cpf: string;
  @Field()
  outsourced_driver_id: string;
}

@InputType()
export class ContractOutsourcedDriverReferecesInput extends OmitType(
  ContractOutsourcedDriverInput,
  ['outsourced_driver_id'],
) {}

@InputType()
export class ContractOutsoucedDriverUpdateInput extends PartialType(
  ContractOutsourcedDriverInput,
) {}
