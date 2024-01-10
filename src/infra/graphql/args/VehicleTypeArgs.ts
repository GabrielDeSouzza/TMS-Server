import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { VehicleTypeOrderByWithRelationInput } from '../prisma-generated/vehicle-type/vehicle-type-order-by-with-relation.input';
import { VehicleTypeWhereInput } from '../prisma-generated/vehicle-type/vehicle-type-where.input';

@ArgsType()
export class VehicleTypeWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => VehicleTypeWhereInput, { nullable: true })
  @Type(() => VehicleTypeWhereInput)
  @IsOptional()
  where?: VehicleTypeWhereInput;

  @Field(() => VehicleTypeOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => VehicleTypeOrderByWithRelationInput)
  @IsOptional()
  sort?: VehicleTypeOrderByWithRelationInput;
}
