import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeletFreightExpenseInput {
  @Field()
  id: string;
}
