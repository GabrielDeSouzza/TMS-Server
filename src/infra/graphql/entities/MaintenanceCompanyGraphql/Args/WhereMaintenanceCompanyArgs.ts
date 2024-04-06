import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { MaintenanceCompanyOrderByWithRelationInput } from 'infra/graphql/prisma-generated/maintenance-company/maintenance-company-order-by-with-relation.input';
import { MaintenanceCompanyWhereInput } from 'infra/graphql/prisma-generated/maintenance-company/maintenance-company-where.input';

@ArgsType()
export class MaintenanceCompanyWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => MaintenanceCompanyWhereInput, { nullable: true })
  @Type(() => MaintenanceCompanyWhereInput)
  @IsOptional()
  where?: MaintenanceCompanyWhereInput;

  @Field(() => MaintenanceCompanyOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => MaintenanceCompanyOrderByWithRelationInput)
  @IsOptional()
  sort?: MaintenanceCompanyOrderByWithRelationInput;
}
