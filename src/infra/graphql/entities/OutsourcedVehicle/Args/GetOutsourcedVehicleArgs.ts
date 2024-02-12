import { ArgsType, Field } from '@nestjs/graphql';

import { GetVehicleArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export class GetOutsoucedVehicleArgs extends GetVehicleArgs {
  @Field({ nullable: true })
  id?: string;
}
