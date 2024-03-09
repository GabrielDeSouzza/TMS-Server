import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { InvoiceForPhysicalCustomerOrderByWithRelationInput } from 'infra/graphql/prisma-generated/invoice-for-physical-customer/invoice-for-physical-customer-order-by-with-relation.input';
import { InvoiceForPhysicalCustomerWhereInput } from 'infra/graphql/prisma-generated/invoice-for-physical-customer/invoice-for-physical-customer-where.input';

@ArgsType()
export class InvoiceForPhysicalCustomerWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => InvoiceForPhysicalCustomerWhereInput, { nullable: true })
  @Type(() => InvoiceForPhysicalCustomerWhereInput)
  @IsOptional()
  where?: InvoiceForPhysicalCustomerWhereInput;

  @Field(() => InvoiceForPhysicalCustomerOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => InvoiceForPhysicalCustomerOrderByWithRelationInput)
  @IsOptional()
  sort?: InvoiceForPhysicalCustomerOrderByWithRelationInput;
}
