import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetVehicleBrandArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  name?: string;
}
