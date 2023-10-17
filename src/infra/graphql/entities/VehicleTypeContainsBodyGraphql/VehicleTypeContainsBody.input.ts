import { Field, InputType } from '@nestjs/graphql';

import { type IVehicleTypeContainsBody } from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';

@InputType()
export class VehicleContainsBodyInput
  implements Omit<IVehicleTypeContainsBody, 'id' | 'updated_at' | 'created_at'>
{
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field()
  vehicle_bodywork_id: string;
  @Field()
  vehicle_type_id: string;
}
