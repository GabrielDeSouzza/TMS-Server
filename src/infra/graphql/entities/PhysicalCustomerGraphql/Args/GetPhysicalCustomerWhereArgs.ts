import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer/physical-customer-order-by-with-relation.input';
import { PhysicalCustomerWhereInput } from 'infra/graphql/prisma-generated/physical-customer/physical-customer-where.input';

@ArgsType()
export class PhysicalCustomerWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => PhysicalCustomerWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerWhereInput)
  @IsOptional()
  where?: PhysicalCustomerWhereInput;

  @Field(() => PhysicalCustomerOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerOrderByWithRelationInput;
}

@ArgsType()
export class PhysicalCustomerCountArgs {
  @Field(() => PhysicalCustomerWhereInput, { nullable: true })
  @Type(() => PhysicalCustomerWhereInput)
  @IsOptional()
  where?: PhysicalCustomerWhereInput;
}
