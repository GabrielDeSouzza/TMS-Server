import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalContractOrderByWithRelationInput } from '../prisma-generated/legal-contract/legal-contract-order-by-with-relation.input';
import { LegalContractWhereInput } from '../prisma-generated/legal-contract/legal-contract-where.input';

@ArgsType()
export class LegalContractWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalContractWhereInput, { nullable: true })
  @Type(() => LegalContractWhereInput)
  @IsOptional()
  where?: LegalContractWhereInput;

  @Field(() => LegalContractOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalContractOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalContractOrderByWithRelationInput;
}
