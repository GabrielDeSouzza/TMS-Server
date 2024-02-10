import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OutsourcedTransportCompanyDriverOrderByWithRelationInput } from '../../../prisma-generated/outsourced-transport-company-driver/outsourced-transport-company-driver-order-by-with-relation.input';
import { OutsourcedTransportCompanyDriverWhereInput } from '../../../prisma-generated/outsourced-transport-company-driver/outsourced-transport-company-driver-where.input';

@ArgsType()
export class OutsourcedTransportCompanyDriverWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedTransportCompanyDriverWhereInput, { nullable: true })
  @Type(() => OutsourcedTransportCompanyDriverWhereInput)
  @IsOptional()
  where?: OutsourcedTransportCompanyDriverWhereInput;

  @Field(() => OutsourcedTransportCompanyDriverOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedTransportCompanyDriverOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedTransportCompanyDriverOrderByWithRelationInput;
}
