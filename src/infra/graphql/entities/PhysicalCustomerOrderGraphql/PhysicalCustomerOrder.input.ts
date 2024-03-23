import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

@InputType()
export class PhysicalCustomerOrderInput
  implements Omit<IPhysicalCustomerOrder, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  quote_table_id: string;
  @HideField()
  @Allow()
  order: string;
  @Field()
  @IsUUID()
  @IsNotEmpty()
  physicalCustomerId: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class PhysicalCustomerOrderUpdateInput extends PartialType(
  PhysicalCustomerOrderInput,
) {}
