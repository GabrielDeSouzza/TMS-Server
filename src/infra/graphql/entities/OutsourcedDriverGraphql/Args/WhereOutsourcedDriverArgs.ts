import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OutsourcedDriverOrderByWithRelationInput } from '../../../prisma-generated/outsourced-driver/outsourced-driver-order-by-with-relation.input';
import { OutsourcedDriverWhereInput } from '../../../prisma-generated/outsourced-driver/outsourced-driver-where.input';

@ArgsType()
export class OutsourcedDriverWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedDriverWhereInput, { nullable: true })
  @Type(() => OutsourcedDriverWhereInput)
  @IsOptional()
  where?: OutsourcedDriverWhereInput;

  @Field(() => OutsourcedDriverOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedDriverOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedDriverOrderByWithRelationInput;
}
@ArgsType()
export class OutsourcedDriverCountArgs {
  @Field(() => OutsourcedDriverWhereInput, { nullable: true })
  @Type(() => OutsourcedDriverWhereInput)
  @IsOptional()
  where?: OutsourcedDriverWhereInput;
}
