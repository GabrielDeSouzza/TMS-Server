import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CtePdfLegalClientInput {
  @Field()
  legalClientOrderId: string;
}
@InputType()
export class CtePdfPhysicalCustomerInput {
  @Field()
  physicalCustomerOrderId: string;
}
