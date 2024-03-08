import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPhysicalCustomerMerchandiseArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  codMerchandise?: string;
}
