import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { VehicleOrderByWithRelationInput } from '../../../prisma-generated/vehicle/vehicle-order-by-with-relation.input';
import { VehicleWhereInput } from '../../../prisma-generated/vehicle/vehicle-where.input';

@ArgsType()
export class VehicleWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => VehicleWhereInput, { nullable: true })
  @Type(() => VehicleWhereInput)
  @IsOptional()
  where?: VehicleWhereInput;

  @Field(() => VehicleOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => VehicleOrderByWithRelationInput)
  @IsOptional()
  sort?: VehicleOrderByWithRelationInput;
}
