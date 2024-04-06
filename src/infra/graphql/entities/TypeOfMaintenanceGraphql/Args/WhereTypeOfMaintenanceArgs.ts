import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { TypeOfMaintenanceOrderByWithRelationInput } from 'infra/graphql/prisma-generated/type-of-maintenance/type-of-maintenance-order-by-with-relation.input';
import { TypeOfMaintenanceWhereInput } from 'infra/graphql/prisma-generated/type-of-maintenance/type-of-maintenance-where.input';

@ArgsType()
export class TypeOfMaintenanceWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => TypeOfMaintenanceWhereInput, { nullable: true })
  @Type(() => TypeOfMaintenanceWhereInput)
  @IsOptional()
  where?: TypeOfMaintenanceWhereInput;

  @Field(() => TypeOfMaintenanceOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => TypeOfMaintenanceOrderByWithRelationInput)
  @IsOptional()
  sort?: TypeOfMaintenanceOrderByWithRelationInput;
}
