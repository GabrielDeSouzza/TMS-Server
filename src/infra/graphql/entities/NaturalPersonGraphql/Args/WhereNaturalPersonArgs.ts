import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { NaturalPersonOrderByWithRelationInput } from 'infra/graphql/prisma-generated/natural-person/natural-person-order-by-with-relation.input';
import { NaturalPersonWhereInput } from 'infra/graphql/prisma-generated/natural-person/natural-person-where.input';

@ArgsType()
export class NaturalPersonWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => NaturalPersonWhereInput, { nullable: true })
  @Type(() => NaturalPersonWhereInput)
  @IsOptional()
  where?: NaturalPersonWhereInput;

  @Field(() => NaturalPersonOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => NaturalPersonOrderByWithRelationInput)
  @IsOptional()
  sort?: NaturalPersonOrderByWithRelationInput;
}
@ArgsType()
export class NaturalPersonCountArgs {
  @Field(() => NaturalPersonWhereInput, { nullable: true })
  @Type(() => NaturalPersonWhereInput)
  @IsOptional()
  where?: NaturalPersonWhereInput;
}
