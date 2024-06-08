import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { LegalPersonOrderByWithRelationInput } from 'infra/graphql/prisma-generated/legal-person/legal-person-order-by-with-relation.input';
import { LegalPersonWhereInput } from 'infra/graphql/prisma-generated/legal-person/legal-person-where.input';

@ArgsType()
export class LegalPersonWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => LegalPersonWhereInput, { nullable: true })
  @Type(() => LegalPersonWhereInput)
  @IsOptional()
  where?: LegalPersonWhereInput;

  @Field(() => LegalPersonOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => LegalPersonOrderByWithRelationInput)
  @IsOptional()
  sort?: LegalPersonOrderByWithRelationInput;
}
@ArgsType()
export class LegalPersonCountArgs {
  @Field(() => LegalPersonWhereInput, { nullable: true })
  @Type(() => LegalPersonWhereInput)
  @IsOptional()
  where?: LegalPersonWhereInput;
}
