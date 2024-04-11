import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class GetIncidentArgs {
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class FreightInput {
  @Field()
  id: string;
}
