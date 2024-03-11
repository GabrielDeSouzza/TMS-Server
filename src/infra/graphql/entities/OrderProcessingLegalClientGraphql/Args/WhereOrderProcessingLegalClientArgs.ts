import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OrderProcessingLegalClientOrderByWithRelationInput } from 'infra/graphql/prisma-generated/order-processing-legal-client/order-processing-legal-client-order-by-with-relation.input';
import { OrderProcessingLegalClientWhereInput } from 'infra/graphql/prisma-generated/order-processing-legal-client/order-processing-legal-client-where.input';

@ArgsType()
export class OrderProcessingLegalClientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OrderProcessingLegalClientWhereInput, { nullable: true })
  @Type(() => OrderProcessingLegalClientWhereInput)
  @IsOptional()
  where?: OrderProcessingLegalClientWhereInput;

  @Field(() => OrderProcessingLegalClientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OrderProcessingLegalClientOrderByWithRelationInput)
  @IsOptional()
  sort?: OrderProcessingLegalClientOrderByWithRelationInput;
}
