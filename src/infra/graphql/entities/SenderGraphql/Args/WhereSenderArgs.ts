import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { SenderOrderByWithRelationInput } from '../../../prisma-generated/sender/sender-order-by-with-relation.input';
import { SenderWhereInput } from '../../../prisma-generated/sender/sender-where.input';

@ArgsType()
export class SenderWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => SenderWhereInput, { nullable: true })
  @Type(() => SenderWhereInput)
  @IsOptional()
  where?: SenderWhereInput;

  @Field(() => SenderOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => SenderOrderByWithRelationInput)
  @IsOptional()
  sort?: SenderOrderByWithRelationInput;
}
