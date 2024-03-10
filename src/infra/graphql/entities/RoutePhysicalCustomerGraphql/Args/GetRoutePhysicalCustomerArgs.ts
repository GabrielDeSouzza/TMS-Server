import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class getRoutePhysicalCustomerArgs {
  @Field({ nullable: true })
  id?: string;
}
