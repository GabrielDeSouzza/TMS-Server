import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { RecipientOrderByWithRelationInput } from '../../../prisma-generated/recipient/recipient-order-by-with-relation.input';
import { RecipientWhereInput } from '../../../prisma-generated/recipient/recipient-where.input';

@ArgsType()
export class RecipientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => RecipientWhereInput, { nullable: true })
  @Type(() => RecipientWhereInput)
  @IsOptional()
  where?: RecipientWhereInput;

  @Field(() => RecipientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => RecipientOrderByWithRelationInput)
  @IsOptional()
  sort?: RecipientOrderByWithRelationInput;
}
