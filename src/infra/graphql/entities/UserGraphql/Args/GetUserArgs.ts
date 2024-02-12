import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class getUserArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  username?: string;
}
