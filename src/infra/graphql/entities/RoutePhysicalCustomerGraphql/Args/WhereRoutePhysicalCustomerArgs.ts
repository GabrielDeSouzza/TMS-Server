import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { RoutesPhysicalCustomerOrderByWithRelationInput } from 'infra/graphql/prisma-generated/routes-physical-customer/routes-physical-customer-order-by-with-relation.input';
import { RoutesPhysicalCustomerWhereInput } from 'infra/graphql/prisma-generated/routes-physical-customer/routes-physical-customer-where.input';

@ArgsType()
export class RoutesPhysicalCustomerWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => RoutesPhysicalCustomerWhereInput, { nullable: true })
  @Type(() => RoutesPhysicalCustomerWhereInput)
  @IsOptional()
  where?: RoutesPhysicalCustomerWhereInput;

  @Field(() => RoutesPhysicalCustomerOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => RoutesPhysicalCustomerOrderByWithRelationInput)
  @IsOptional()
  sort?: RoutesPhysicalCustomerOrderByWithRelationInput;
}
