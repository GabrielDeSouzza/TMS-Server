import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

// Substitua esses imports pelos equivalentes relacionados à sua entidade OutsourcedTransportVehicle
import { OutsourcedTransportVehicleOrderByWithRelationInput } from '../prisma-generated/outsourced-transport-vehicle/outsourced-transport-vehicle-order-by-with-relation.input';
import { OutsourcedTransportVehicleWhereInput } from '../prisma-generated/outsourced-transport-vehicle/outsourced-transport-vehicle-where.input';

@ArgsType()
export class OutsourcedTransportVehicleWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedTransportVehicleWhereInput, { nullable: true })
  @Type(() => OutsourcedTransportVehicleWhereInput)
  @IsOptional()
  where?: OutsourcedTransportVehicleWhereInput;

  @Field(() => OutsourcedTransportVehicleOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedTransportVehicleOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedTransportVehicleOrderByWithRelationInput;
}
