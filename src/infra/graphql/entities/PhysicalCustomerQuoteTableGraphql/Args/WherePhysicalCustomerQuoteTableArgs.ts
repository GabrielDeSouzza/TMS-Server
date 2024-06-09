import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerQuoteTableOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer-quote-table/physical-customer-quote-table-order-by-with-relation.input';
import { PhysicalCustomerQuoteTableWhereInput } from 'infra/graphql/prisma-generated/physical-customer-quote-table/physical-customer-quote-table-where.input';

@ArgsType()
export class PhysicalCustomerQuoteTableWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => PhysicalCustomerQuoteTableWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerQuoteTableWhereInput)
  @IsOptional()
  where?: PhysicalCustomerQuoteTableWhereInput;

  @Field(() => PhysicalCustomerQuoteTableOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerQuoteTableOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerQuoteTableOrderByWithRelationInput;
}

@ArgsType()
export class PhysicalCustomerQuoteTableCountArgs {
  @Field(() => PhysicalCustomerQuoteTableWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerQuoteTableWhereInput)
  @IsOptional()
  where?: PhysicalCustomerQuoteTableWhereInput;
}
