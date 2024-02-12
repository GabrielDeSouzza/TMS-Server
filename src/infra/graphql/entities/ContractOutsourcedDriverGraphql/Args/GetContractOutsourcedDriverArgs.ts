import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetContractOutsourcedDriverArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  contractNumber?: string;
}
