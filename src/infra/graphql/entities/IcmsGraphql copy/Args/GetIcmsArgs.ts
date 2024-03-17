import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
class StateRelationIcmsArgs {
  @Field()
  state_origin: string;
  @Field()
  recipient_state: string;
}

@ArgsType()
export class GetIcmsArgs {
  @Field({ nullable: true })
  id: string;
  @Field(() => StateRelationIcmsArgs, { nullable: true })
  StateRelation?: StateRelationIcmsArgs;
}
