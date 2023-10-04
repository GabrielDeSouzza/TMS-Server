import { Field, ObjectType } from '@nestjs/graphql';

import { type IVehicleTypeContainsBody } from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';

@ObjectType()
export class VehicleTypeContainsBodyGraphql
  implements IVehicleTypeContainsBody
{
  @Field()
  id?: string;
  @Field()
  vehicle_bodywork_id: string;
  @Field()
  vehicle_type_id: string;
  @Field(() => Date)
  updated_at: Date;
  @Field(() => Date)
  created_at: Date;
}
