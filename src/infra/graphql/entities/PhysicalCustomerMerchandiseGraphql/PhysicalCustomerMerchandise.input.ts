import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { type IPhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

@InputType()
export class PhysicalCustomerMerchandiseInput
  implements
    Omit<IPhysicalCustomerMerchandise, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  codMerchandise: string;
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  amount: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  mass: number;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  volume: number;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  value: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  physicalCustomerOrderId: string;
}
@InputType()
export class PhysicalCustomerMerchandiseUpdateInput extends PartialType(
  PhysicalCustomerMerchandiseInput,
) {}
