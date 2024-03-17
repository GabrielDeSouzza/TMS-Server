import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class GetNaturalPersonArgs {
  @Field({ nullable: true })
  naturalPersonId?: string;
  @Field({ nullable: true })
  cpf?: string;
  @Field({ nullable: true })
  rg?: string;
}

@InputType()
export class GetNaturalPersonInput extends GetNaturalPersonArgs {
  @Field({ nullable: true })
  naturalPersonId?: string;
  @Field({ nullable: true })
  cpf?: string;
  @Field({ nullable: true })
  rg?: string;
}
