import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetOrderProcessingPhysicalCustomerArgs {
  @Field({ nullable: true })
  id?: string;
}
