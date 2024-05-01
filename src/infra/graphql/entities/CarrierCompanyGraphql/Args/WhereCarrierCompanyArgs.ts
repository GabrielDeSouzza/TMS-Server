import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { CarrierCompanyOrderByWithRelationInput } from '../../../prisma-generated/carrier-company/carrier-company-order-by-with-relation.input';
import { CarrierCompanyWhereInput } from '../../../prisma-generated/carrier-company/carrier-company-where.input';

@ArgsType()
export class CarrierCompanyWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => CarrierCompanyWhereInput, { nullable: true })
  @Type(() => CarrierCompanyWhereInput)
  @IsOptional()
  where?: CarrierCompanyWhereInput;

  @Field(() => CarrierCompanyOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => CarrierCompanyOrderByWithRelationInput)
  @IsOptional()
  sort?: CarrierCompanyOrderByWithRelationInput;
}

@ArgsType()
export class CarrierCompanyCountArgs {
  @Field(() => CarrierCompanyWhereInput, { nullable: true })
  @Type(() => CarrierCompanyWhereInput)
  @IsOptional()
  where?: CarrierCompanyWhereInput;
}
