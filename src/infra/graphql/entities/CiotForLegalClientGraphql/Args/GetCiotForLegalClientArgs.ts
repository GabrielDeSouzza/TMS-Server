import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetCiotForLegalClientArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  ciot?: string;
}
