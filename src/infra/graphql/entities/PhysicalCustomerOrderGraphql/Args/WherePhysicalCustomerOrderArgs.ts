import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerOrderOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer-order/physical-customer-order-order-by-with-relation.input';
import { PhysicalCustomerOrderWhereInput } from 'infra/graphql/prisma-generated/physical-customer-order/physical-customer-order-where.input';

@ArgsType()
export class PhysicalCustomerOrderWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => PhysicalCustomerOrderWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerOrderWhereInput)
  @IsOptional()
  where?: PhysicalCustomerOrderWhereInput;

  @Field(() => PhysicalCustomerOrderOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerOrderOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerOrderOrderByWithRelationInput;
}
