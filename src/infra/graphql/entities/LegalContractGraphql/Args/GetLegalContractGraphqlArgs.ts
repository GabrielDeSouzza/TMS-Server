import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetLegalContractArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  contractNumber?: string;
}
