import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalClientOrderByWithRelationInput } from '../prisma-generated/legal-client/legal-client-order-by-with-relation.input';
import { LegalClientWhereInput } from '../prisma-generated/legal-client/legal-client-where.input';

@ArgsType()
export class LegalClientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalClientWhereInput, { nullable: true })
  @Type(() => LegalClientWhereInput)
  @IsOptional()
  where?: LegalClientWhereInput;

  @Field(() => LegalClientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalClientOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalClientOrderByWithRelationInput;
}
