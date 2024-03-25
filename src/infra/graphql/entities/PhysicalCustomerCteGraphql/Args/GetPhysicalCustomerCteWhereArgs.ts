import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { PhysicalCustomerCteOrderByWithRelationInput } from 'infra/graphql/prisma-generated/physical-customer-cte/physical-customer-cte-order-by-with-relation.input';

import { OwnDriverWhereInput } from '../../../prisma-generated/own-driver/own-driver-where.input';

@ArgsType()
export class PhysicalCustomerCteWhereArgs {
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

  @Field(() => PhysicalCustomerCteOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => PhysicalCustomerCteOrderByWithRelationInput)
  @IsOptional()
  sort?: PhysicalCustomerCteOrderByWithRelationInput;
}
