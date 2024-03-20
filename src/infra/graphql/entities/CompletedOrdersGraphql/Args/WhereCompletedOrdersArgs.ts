import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { CompletedOrdersOrderByWithRelationInput } from 'infra/graphql/prisma-generated/completed-orders/completed-orders-order-by-with-relation.input';
import { CompletedOrdersWhereInput } from 'infra/graphql/prisma-generated/completed-orders/completed-orders-where.input';

@ArgsType()
export class CompletedOrdersWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => CompletedOrdersWhereInput, { nullable: true })
  @Type(() => CompletedOrdersWhereInput)
  @IsOptional()
  where?: CompletedOrdersWhereInput;

  @Field(() => CompletedOrdersOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => CompletedOrdersOrderByWithRelationInput)
  @IsOptional()
  sort?: CompletedOrdersOrderByWithRelationInput;
}
