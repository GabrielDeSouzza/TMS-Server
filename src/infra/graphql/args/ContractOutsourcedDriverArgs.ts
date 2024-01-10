import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { ContractOutsourcedDriverOrderByWithRelationInput } from '../prisma-generated/contract-outsourced-driver/contract-outsourced-driver-order-by-with-relation.input';
import { ContractOutsourcedDriverWhereInput } from '../prisma-generated/contract-outsourced-driver/contract-outsourced-driver-where.input';

@ArgsType()
export class ContractOutsourcedDriverWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => ContractOutsourcedDriverWhereInput, { nullable: true })
  @Type(() => ContractOutsourcedDriverWhereInput)
  @IsOptional()
  where?: ContractOutsourcedDriverWhereInput;

  @Field(() => ContractOutsourcedDriverOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => ContractOutsourcedDriverOrderByWithRelationInput)
  @IsOptional()
  sort?: ContractOutsourcedDriverOrderByWithRelationInput;
}
