import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { UserOrderByWithRelationInput } from '../prisma-generated/user/user-order-by-with-relation.input';
import { UserWhereInput } from '../prisma-generated/user/user-where.input';

@ArgsType()
export class UserWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  @IsOptional()
  where?: UserWhereInput;

  @Field(() => UserOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => UserOrderByWithRelationInput)
  @IsOptional()
  sort?: UserOrderByWithRelationInput;
}
