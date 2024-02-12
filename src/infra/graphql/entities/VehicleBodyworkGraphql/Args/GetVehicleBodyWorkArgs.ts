import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetVehicleBodyWorkArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  name?: string;
}
