import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { VehicleModelOrderByWithRelationInput } from '../prisma-generated/vehicle-model/vehicle-model-order-by-with-relation.input';
import { VehicleModelWhereInput } from '../prisma-generated/vehicle-model/vehicle-model-where.input';

@ArgsType()
export class VehicleModelWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => VehicleModelWhereInput, { nullable: true })
  @Type(() => VehicleModelWhereInput)
  @IsOptional()
  where?: VehicleModelWhereInput;

  @Field(() => VehicleModelOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => VehicleModelOrderByWithRelationInput)
  @IsOptional()
  sort?: VehicleModelOrderByWithRelationInput;
}
