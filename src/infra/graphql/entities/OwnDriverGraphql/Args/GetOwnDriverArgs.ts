import { ArgsType, Field } from '@nestjs/graphql';

import { GetNaturalPersonArgs } from '../../NaturalPersonGraphql/Args/GetNaturalPersonArgs';

@ArgsType()
export abstract class GetOwnDriverArgs extends GetNaturalPersonArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  cnh?: string;
}
