import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class GetLegalPersonArgs {
  @Field({ nullable: true })
  legalPersonId?: string;
  @Field({ nullable: true })
  cnpj?: string;
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  corporateName?: string;
  @Field({ nullable: true })
  fantasyName?: string;
}

@InputType()
export class GetLegalPersonInput extends GetLegalPersonArgs {
  @Field({ nullable: true })
  legalPersonId?: string;
  @Field({ nullable: true })
  cnpj?: string;
  @Field({ nullable: true })
  corporateName?: string;
  @Field({ nullable: true })
  fantasyName?: string;
}
