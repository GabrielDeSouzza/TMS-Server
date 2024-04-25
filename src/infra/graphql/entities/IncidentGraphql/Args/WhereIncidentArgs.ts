import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { IncidentOrderByWithRelationInput } from 'infra/graphql/prisma-generated/incident/incident-order-by-with-relation.input';
import { IncidentWhereInput } from 'infra/graphql/prisma-generated/incident/incident-where.input';

@ArgsType()
export class IncidentWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => IncidentWhereInput, { nullable: true })
  @Type(() => IncidentWhereInput)
  @IsOptional()
  where?: IncidentWhereInput;

  @Field(() => IncidentOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => IncidentOrderByWithRelationInput)
  @IsOptional()
  sort?: IncidentOrderByWithRelationInput;
}

@ArgsType()
export class IncidentCountArgs {
  @Field(() => IncidentWhereInput, { nullable: true })
  @Type(() => IncidentWhereInput)
  @IsOptional()
  where?: IncidentWhereInput;
}
