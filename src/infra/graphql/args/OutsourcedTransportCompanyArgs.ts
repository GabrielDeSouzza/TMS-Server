import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OutsourcedTransportCompanyOrderByWithRelationInput } from '../prisma-generated/outsourced-transport-company/outsourced-transport-company-order-by-with-relation.input';
import { OutsourcedTransportCompanyWhereInput } from '../prisma-generated/outsourced-transport-company/outsourced-transport-company-where.input';

@ArgsType()
export class OutsourcedTransportCompanyWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedTransportCompanyWhereInput, { nullable: true })
  @Type(() => OutsourcedTransportCompanyWhereInput)
  @IsOptional()
  where?: OutsourcedTransportCompanyWhereInput;

  @Field(() => OutsourcedTransportCompanyOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedTransportCompanyOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedTransportCompanyOrderByWithRelationInput;
}
