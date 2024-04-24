import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { FreightExpensesOrderByWithRelationInput } from 'infra/graphql/prisma-generated/freight-expenses/freight-expenses-order-by-with-relation.input';
import { FreightExpensesWhereInput } from 'infra/graphql/prisma-generated/freight-expenses/freight-expenses-where.input';

@ArgsType()
export class FreightExpenseWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => FreightExpensesWhereInput, { nullable: true })
  @Type(() => FreightExpensesWhereInput)
  @IsOptional()
  where?: FreightExpensesWhereInput;

  @Field(() => FreightExpensesOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => FreightExpensesOrderByWithRelationInput)
  @IsOptional()
  sort?: FreightExpensesOrderByWithRelationInput;
}

@ArgsType()
export class FreightExpenseCountArgs {
  @Field(() => FreightExpensesWhereInput, { nullable: true })
  @Type(() => FreightExpenseWhereArgs)
  @IsOptional()
  where?: FreightExpensesWhereInput;
}
