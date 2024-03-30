import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CtePDfModel {
  @Field()
  cteUrl: string;
}
