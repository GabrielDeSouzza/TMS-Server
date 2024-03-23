import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export abstract class GetLegalClientQuoteTableArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  cod_quote?: string;
}
