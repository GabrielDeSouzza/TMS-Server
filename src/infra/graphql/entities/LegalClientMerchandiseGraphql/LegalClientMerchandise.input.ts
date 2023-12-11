import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';

import { type ILegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

@InputType()
export class LegalClientMerchandiseInput
  implements Omit<ILegalClientMerchandise, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  codMerchandise: string;
  @Field(() => Int)
  amount: number;
  @Field()
  description: string;
  @Field(() => Float)
  mass: number;
  @Field(() => Float)
  volume: number;
  @Field(() => Float)
  value: number;
  @Field()
  legalClientOrderId: string;
}
@InputType()
export class LegalClientMerchandiseUpdateInput extends PartialType(
  LegalClientMerchandiseInput,
) {}
