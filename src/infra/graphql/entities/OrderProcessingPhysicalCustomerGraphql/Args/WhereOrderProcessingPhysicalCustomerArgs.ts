import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OrderProcessingPhysicalCustomerOrderByWithRelationInput } from 'infra/graphql/prisma-generated/order-processing-physical-customer/order-processing-physical-customer-order-by-with-relation.input';
import { OrderProcessingPhysicalCustomerWhereInput } from 'infra/graphql/prisma-generated/order-processing-physical-customer/order-processing-physical-customer-where.input';

@ArgsType()
export class OrderProcessingPhysicalCustomerWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OrderProcessingPhysicalCustomerWhereInput, { nullable: true })
  @Type(() => OrderProcessingPhysicalCustomerWhereInput)
  @IsOptional()
  where?: OrderProcessingPhysicalCustomerWhereInput;

  @Field(() => OrderProcessingPhysicalCustomerOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OrderProcessingPhysicalCustomerOrderByWithRelationInput)
  @IsOptional()
  sort?: OrderProcessingPhysicalCustomerOrderByWithRelationInput;
}
