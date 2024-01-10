import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

// Substitua esses imports pelos equivalentes relacionados à sua entidade OutsourcedVehicle
import { OutsourcedVehicleOrderByWithRelationInput } from '../prisma-generated/outsourced-vehicle/outsourced-vehicle-order-by-with-relation.input';
import { OutsourcedVehicleWhereInput } from '../prisma-generated/outsourced-vehicle/outsourced-vehicle-where.input';

@ArgsType()
export class OutsourcedVehicleWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedVehicleWhereInput, { nullable: true })
  @Type(() => OutsourcedVehicleWhereInput)
  @IsOptional()
  where?: OutsourcedVehicleWhereInput;

  @Field(() => OutsourcedVehicleOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedVehicleOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedVehicleOrderByWithRelationInput;
}
