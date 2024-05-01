import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OrderProcessingOrderByWithRelationInput } from 'infra/graphql/prisma-generated/order-processing/order-processing-order-by-with-relation.input';
import { OrderProcessingWhereInput } from 'infra/graphql/prisma-generated/order-processing/order-processing-where.input';

@ArgsType()
export class OrderProcessingWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OrderProcessingWhereInput, { nullable: true })
  @Type(() => OrderProcessingWhereInput)
  @IsOptional()
  where?: OrderProcessingWhereInput;

  @Field(() => OrderProcessingOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OrderProcessingOrderByWithRelationInput)
  @IsOptional()
  sort?: OrderProcessingOrderByWithRelationInput;
}
@ArgsType()
export class OrderProcessingCountArgs {
  @Field(() => OrderProcessingWhereInput, { nullable: true })
  @Type(() => OrderProcessingWhereInput)
  @IsOptional()
  where?: OrderProcessingWhereInput;
}
