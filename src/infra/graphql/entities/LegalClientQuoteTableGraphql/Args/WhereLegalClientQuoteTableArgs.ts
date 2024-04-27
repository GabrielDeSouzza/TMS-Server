import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalClientQuoteTableOrderByWithRelationInput } from 'infra/graphql/prisma-generated/legal-client-quote-table/legal-client-quote-table-order-by-with-relation.input';
import { LegalClientQuoteTableWhereInput } from 'infra/graphql/prisma-generated/legal-client-quote-table/legal-client-quote-table-where.input';

@ArgsType()
export class LegalClientQuoteTableWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalClientQuoteTableWhereInput, { nullable: true })
  @Type(() => LegalClientQuoteTableWhereInput)
  @IsOptional()
  where?: LegalClientQuoteTableWhereInput;

  @Field(() => LegalClientQuoteTableOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalClientQuoteTableOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalClientQuoteTableOrderByWithRelationInput;
}
@ArgsType()
export class LegalClientQuoteTableCountArgs {
  @Field(() => LegalClientQuoteTableWhereInput, { nullable: true })
  @Type(() => LegalClientQuoteTableWhereInput)
  @IsOptional()
  where?: LegalClientQuoteTableWhereInput;
}
