import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetLegalClientMerchandisesArgs {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  codMerchandise?: string;
}
