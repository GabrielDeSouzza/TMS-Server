import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { InvoiceForLegalClientOrderByWithRelationInput } from '../../../prisma-generated/invoice-for-legal-client/invoice-for-legal-client-order-by-with-relation.input';
import { InvoiceForLegalClientWhereInput } from '../../../prisma-generated/invoice-for-legal-client/invoice-for-legal-client-where.input';

@ArgsType()
export class InvoiceForLegalClientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => InvoiceForLegalClientWhereInput, { nullable: true })
  @Type(() => InvoiceForLegalClientWhereInput)
  @IsOptional()
  where?: InvoiceForLegalClientWhereInput;

  @Field(() => InvoiceForLegalClientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => InvoiceForLegalClientOrderByWithRelationInput)
  @IsOptional()
  sort?: InvoiceForLegalClientOrderByWithRelationInput;
}
