import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { IcmsOrderByWithRelationInput } from '../../../prisma-generated/icms/icms-order-by-with-relation.input';
import { IcmsWhereInput } from '../../../prisma-generated/icms/icms-where.input';

@ArgsType()
export class IcmsWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => IcmsWhereInput, { nullable: true })
  @Type(() => IcmsWhereInput)
  @IsOptional()
  where?: IcmsWhereInput;

  @Field(() => IcmsOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => IcmsOrderByWithRelationInput)
  @IsOptional()
  sort?: IcmsOrderByWithRelationInput;
}
