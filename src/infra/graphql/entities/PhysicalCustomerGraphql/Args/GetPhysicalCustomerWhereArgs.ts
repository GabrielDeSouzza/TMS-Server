import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer/physical-customer-order-by-with-relation.input';

import { OwnDriverWhereInput } from '../../../prisma-generated/own-driver/own-driver-where.input';

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

  @Field(() => OwnDriverWhereInput, { nullable: true })
  @Type(() => OwnDriverWhereInput)
  @IsOptional()
  where?: OwnDriverWhereInput;

  @Field(() => PhysicalCustomerOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerOrderByWithRelationInput;
}
