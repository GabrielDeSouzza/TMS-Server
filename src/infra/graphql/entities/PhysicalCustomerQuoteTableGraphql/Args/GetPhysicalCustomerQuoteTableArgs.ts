import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export abstract class GetPhysicalCustomerQuoteTableArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  cod_quote?: string;
}
