import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

@InputType()
export class LegalClientMerchandiseInput
  implements Omit<ILegalClientMerchandise, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  legal_client_order_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  invoice_legal_client: string;
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
  @IsDecimal()
  @IsNotEmpty()
  mass: number;
  @Field(() => Float)
  @IsDecimal()
  @IsNotEmpty()
  volume: number;
  @Field(() => Float)
  @IsDecimal()
  @IsNotEmpty()
  value: number;
}
@InputType()
export class LegalClientMerchandiseUpdateInput extends PartialType(
  LegalClientMerchandiseInput,
) {}
