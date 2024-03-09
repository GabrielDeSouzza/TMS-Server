import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetInvoiceForPhysicalCustomerArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  invoice_number?: string;
}
