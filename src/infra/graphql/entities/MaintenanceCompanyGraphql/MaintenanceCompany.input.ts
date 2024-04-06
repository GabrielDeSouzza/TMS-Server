import {
  Field,
  HideField,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { Allow, IsObject, IsOptional, IsString } from 'class-validator';

import { type IMaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';

import {
  LegalPersonUpdateInput,
  LegalPersonInput,
} from '../LegalPersonGraphql/LegalPerson.input';

@InputType()
export class MaintenanceCompanyInput
  implements Omit<IMaintenanceCompany, 'id' | 'created_at' | 'updated_at'>
{
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  legal_person_id?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  specialty_maintenance: string;
  @Field(() => LegalPersonInput, { nullable: true })
  @IsObject()
  @IsOptional()
  LegalPerson?: LegalPersonInput;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}
@InputType()
export class MaintenanceCompanyUpdateInput extends PartialType(
  OmitType(MaintenanceCompanyInput, ['LegalPerson', 'legal_person_id']),
) {
  @Field(() => LegalPersonUpdateInput)
  LegalPerson: LegalPersonUpdateInput;
}
