import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class getRouteLegalClientArgs {
  @Field({ nullable: true })
  id?: string;
}
