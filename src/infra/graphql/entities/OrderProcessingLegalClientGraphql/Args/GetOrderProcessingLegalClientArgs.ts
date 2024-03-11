import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetOrderProcessingLegalClientArgs {
  @Field({ nullable: true })
  id?: string;
}
