import { Field, InputType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

@InputType()
export class VehicleBrandInput implements IVehicleBrand {
  @Field()
  name: string;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  created_at: Date;
  updated_at: Date;
}
