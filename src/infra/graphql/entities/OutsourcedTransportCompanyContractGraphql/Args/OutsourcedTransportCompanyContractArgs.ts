import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Max, Min, IsOptional } from 'class-validator';

import { OutsourcedTransportCompanyContractOrderByWithRelationInput } from '../../../prisma-generated/outsourced-transport-company-contract/outsourced-transport-company-contract-order-by-with-relation.input';
import { OutsourcedTransportCompanyContractWhereInput } from '../../../prisma-generated/outsourced-transport-company-contract/outsourced-transport-company-contract-where.input';

@ArgsType()
export class OutsourcedTransportCompanyContractWhereArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @Min(0)
  offset = 0;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @Min(1)
  @Max(50)
  limit = 25;

  @Field(() => OutsourcedTransportCompanyContractWhereInput, { nullable: true })
  @Type(() => OutsourcedTransportCompanyContractWhereInput)
  @IsOptional()
  where?: OutsourcedTransportCompanyContractWhereInput;

  @Field(() => OutsourcedTransportCompanyContractOrderByWithRelationInput, {
    nullable: true,
  })
  @Type(() => OutsourcedTransportCompanyContractOrderByWithRelationInput)
  @IsOptional()
  sort?: OutsourcedTransportCompanyContractOrderByWithRelationInput;
}
