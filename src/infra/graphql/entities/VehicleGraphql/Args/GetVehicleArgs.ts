import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class GetVehicleArgs {
  @Field({ nullable: true })
  vehicleId?: string;
  @Field({ nullable: true })
  plate?: string;
}

@InputType()
export class GetVehicleTypeArgs {
  @Field({ nullable: true })
  vehicleId?: string;
  @Field({ nullable: true })
  plate?: string;
}
