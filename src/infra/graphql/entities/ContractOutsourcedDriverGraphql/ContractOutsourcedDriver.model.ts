import { Field, ObjectType } from '@nestjs/graphql';

import { type IContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

@ObjectType()
export class ContractOutsourcedDriverModel
  implements IContractOutsourcedDriver
{
  @Field()
  id: string;
  @Field()
  contract_number: string;
  @Field()
  type: string;
  @Field()
  situation: string;
  @Field(() => Date)
  start_at: Date;
  @Field(() => Date)
  end_at?: Date;
  @Field(() => Date)
  created_at: Date;
  @Field(() => Date)
  updated_at: Date;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
  @Field()
  cpf: string;
  @Field()
  outsourced_driver_id: string;
}
