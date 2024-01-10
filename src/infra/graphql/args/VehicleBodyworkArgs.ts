import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { VehicleBodyworkOrderByWithRelationInput } from '../prisma-generated/vehicle-bodywork/vehicle-bodywork-order-by-with-relation.input';
import { VehicleBodyworkWhereInput } from '../prisma-generated/vehicle-bodywork/vehicle-bodywork-where.input';

@ArgsType()
export class VehicleBodyworkWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => VehicleBodyworkWhereInput, { nullable: true })
  @Type(() => VehicleBodyworkWhereInput)
  @IsOptional()
  where?: VehicleBodyworkWhereInput;

  @Field(() => VehicleBodyworkOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => VehicleBodyworkOrderByWithRelationInput)
  @IsOptional()
  sort?: VehicleBodyworkOrderByWithRelationInput;
}
