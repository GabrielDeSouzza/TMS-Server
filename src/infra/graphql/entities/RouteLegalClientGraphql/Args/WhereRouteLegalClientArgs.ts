import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { RoutesLegalClientOrderByWithRelationInput } from 'infra/graphql/prisma-generated/routes-legal-client/routes-legal-client-order-by-with-relation.input';
import { RoutesLegalClientWhereInput } from 'infra/graphql/prisma-generated/routes-legal-client/routes-legal-client-where.input';

@ArgsType()
export class RoutesLegalClientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => RoutesLegalClientWhereInput, { nullable: true })
  @Type(() => RoutesLegalClientWhereInput)
  @IsOptional()
  where?: RoutesLegalClientWhereInput;

  @Field(() => RoutesLegalClientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => RoutesLegalClientOrderByWithRelationInput)
  @IsOptional()
  sort?: RoutesLegalClientOrderByWithRelationInput;
}
