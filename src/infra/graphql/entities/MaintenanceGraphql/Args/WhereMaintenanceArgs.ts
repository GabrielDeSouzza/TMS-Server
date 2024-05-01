import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { MaintenanceOrderByWithRelationInput } from '../../../prisma-generated/maintenance/maintenance-order-by-with-relation.input';
import { MaintenanceWhereInput } from '../../../prisma-generated/maintenance/maintenance-where.input';

@ArgsType()
export class MaintenanceWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => MaintenanceWhereInput, { nullable: true })
  @Type(() => MaintenanceWhereInput)
  @IsOptional()
  where?: MaintenanceWhereInput;

  @Field(() => MaintenanceOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => MaintenanceOrderByWithRelationInput)
  @IsOptional()
  sort?: MaintenanceOrderByWithRelationInput;
}

@ArgsType()
export class MaintenanceCountArgs {
  @Field(() => MaintenanceWhereInput, { nullable: true })
  @Type(() => MaintenanceWhereInput)
  @IsOptional()
  where?: MaintenanceWhereInput;
}
