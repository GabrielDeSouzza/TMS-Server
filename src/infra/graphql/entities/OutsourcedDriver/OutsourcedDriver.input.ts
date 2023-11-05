import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { type IOutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { CNH } from 'domain/entities/driverEntities/ownDriver/OwnDriver';

import {
  ContractOutsoucedDriverUpdateInput,
  ContractOutsourcedDriverReferecesInput,
} from '../ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.input';
import {
  NaturalPersonInput,
  NaturalPersonUpdate,
} from '../NaturalPersonGraphql/NaturalPerson.Input';
import {
  OutsourcedVehicleInput,
  OutsourcedVehicleUpdateInput,
} from '../OutsourcedVehicle/OutsourcedVehicle.input';

@InputType()
export class OutsourcedDriverInput
  implements Omit<IOutsourcedDriver, 'id' | 'created_at' | 'updated_at'>
{
  @HideField()
  outsourced_vehicle_id: string;
  @HideField()
  natural_person_id: string;
  @Field(() => NaturalPersonInput)
  NaturalPerson: NaturalPersonInput;
  @Field()
  cnh: string;
  @Field()
  cnh_category: CNH;
  @Field()
  cnh_expiration: Date;
  @Field()
  company_vehicle: boolean;
  @Field()
  course_mopp: boolean;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
  @Field(() => ContractOutsourcedDriverReferecesInput)
  ContractOutsourcedDriver: ContractOutsourcedDriverReferecesInput;
  @Field(() => OutsourcedVehicleInput, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleInput;
}

@InputType()
export class OutsourcedDriverUpdateInput extends PartialType(
  OmitType(OutsourcedDriverInput, [
    'ContractOutsourcedDriver',
    'OutsourcedVehicle',
    'NaturalPerson',
  ]),
) {
  @Field(() => NaturalPersonUpdate, { nullable: true })
  NaturalPerson: NaturalPersonUpdate;
  @Field(() => ContractOutsoucedDriverUpdateInput, { nullable: true })
  ContractOutsourcedDriver?: ContractOutsoucedDriverUpdateInput;
  @Field(() => OutsourcedVehicleUpdateInput, { nullable: true })
  OutsourcedVehicle?: OutsourcedVehicleUpdateInput;
}
