import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CtePdfLegalClientInput {
  @Field()
  cteLegalPersonId: string;
}
@InputType()
export class CtePdfPhysicalCustomerInput {
  @Field()
  ctePhysicalCustomerId: string;
}
