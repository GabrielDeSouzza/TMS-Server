import { ArgsType, Field } from '@nestjs/graphql';

import { GetNaturalPersonArgs } from '../../NaturalPersonGraphql/Args/GetNaturalPersonArgs';

@ArgsType()
export class GetOutsoucedDriverArgs extends GetNaturalPersonArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  cnh?: string;
}
