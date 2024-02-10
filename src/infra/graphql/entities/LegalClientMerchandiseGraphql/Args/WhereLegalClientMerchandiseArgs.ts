import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalClientMerchandiseOrderByWithRelationInput } from '../../../prisma-generated/legal-client-merchandise/legal-client-merchandise-order-by-with-relation.input';
import { LegalClientMerchandiseWhereInput } from '../../../prisma-generated/legal-client-merchandise/legal-client-merchandise-where.input';

@ArgsType()
export class LegalClientMerchandiseWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalClientMerchandiseWhereInput, { nullable: true })
  @Type(() => LegalClientMerchandiseWhereInput)
  @IsOptional()
  where?: LegalClientMerchandiseWhereInput;

  @Field(() => LegalClientMerchandiseOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalClientMerchandiseOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalClientMerchandiseOrderByWithRelationInput;
}
