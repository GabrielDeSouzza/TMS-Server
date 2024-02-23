import { ArgsType, Field } from '@nestjs/graphql';

import { GetVehicleArgs } from '../../VehicleGraphql/Args/GetVehicleArgs';

@ArgsType()
export abstract class GetOutsourcedTransportVehicleArgs extends GetVehicleArgs {
  @Field({ nullable: true })
  id?: string;
}
