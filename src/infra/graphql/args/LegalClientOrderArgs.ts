import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalClientOrderOrderByWithRelationInput } from '../prisma-generated/legal-client-order/legal-client-order-order-by-with-relation.input';
import { LegalClientOrderWhereInput } from '../prisma-generated/legal-client-order/legal-client-order-where.input';

@ArgsType()
export class LegalClientOrderWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalClientOrderWhereInput, { nullable: true })
  @Type(() => LegalClientOrderWhereInput)
  @IsOptional()
  where?: LegalClientOrderWhereInput;

  @Field(() => LegalClientOrderOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalClientOrderOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalClientOrderOrderByWithRelationInput;
}
