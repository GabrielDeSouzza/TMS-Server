import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { VehicleBrandOrderByWithRelationInput } from '../prisma-generated/vehicle-brand/vehicle-brand-order-by-with-relation.input';
import { VehicleBrandWhereInput } from '../prisma-generated/vehicle-brand/vehicle-brand-where.input';

@ArgsType()
export class VehicleBrandWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => VehicleBrandWhereInput, { nullable: true })
  @Type(() => VehicleBrandWhereInput)
  @IsOptional()
  where?: VehicleBrandWhereInput;

  @Field(() => VehicleBrandOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => VehicleBrandOrderByWithRelationInput)
  @IsOptional()
  sort?: VehicleBrandOrderByWithRelationInput;
}
