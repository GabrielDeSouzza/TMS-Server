import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetVehicleArgs {
  @Field({ nullable: true })
  vehicleId?: string;
  @Field({ nullable: true })
  plate?: string;
}
