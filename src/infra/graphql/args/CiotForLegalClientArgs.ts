import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { CiotForLegalClientOrderByWithRelationInput } from '../prisma-generated/ciot-for-legal-client/ciot-for-legal-client-order-by-with-relation.input';
import { CiotForLegalClientWhereInput } from '../prisma-generated/ciot-for-legal-client/ciot-for-legal-client-where.input';

@ArgsType()
export class CiotForLegalClientWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => CiotForLegalClientWhereInput, { nullable: true })
  @Type(() => CiotForLegalClientWhereInput)
  @IsOptional()
  where?: CiotForLegalClientWhereInput;

  @Field(() => CiotForLegalClientOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => CiotForLegalClientOrderByWithRelationInput)
  @IsOptional()
  sort?: CiotForLegalClientOrderByWithRelationInput;
}
