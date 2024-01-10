import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { CompanyVehicleOrderByWithRelationInput } from '../prisma-generated/company-vehicle/company-vehicle-order-by-with-relation.input';
import { CompanyVehicleWhereInput } from '../prisma-generated/company-vehicle/company-vehicle-where.input';

@ArgsType()
export class CompanyVehicleWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => CompanyVehicleWhereInput, { nullable: true })
  @Type(() => CompanyVehicleWhereInput)
  @IsOptional()
  where?: CompanyVehicleWhereInput;

  @Field(() => CompanyVehicleOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => CompanyVehicleOrderByWithRelationInput)
  @IsOptional()
  sort?: CompanyVehicleOrderByWithRelationInput;
}
