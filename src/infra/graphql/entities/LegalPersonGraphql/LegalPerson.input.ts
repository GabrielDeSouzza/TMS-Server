import { Field, InputType, PartialType } from '@nestjs/graphql';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
  Validate,
} from 'class-validator';

import { type ILegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

import { ValidationPhone } from 'infra/CustomValidations/PhoneValidation';
import { UFEnum } from 'infra/graphql/enums/Uf.enum';

@InputType()
export class LegalPersonInput
  implements Omit<ILegalPerson, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  @Min(3)
  fantasy_name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(14)
  cnpj: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(8)
  cep: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  state_registration: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  @Min(3)
  corporate_name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  @Min(3)
  public_place: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  address_number: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  complement?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;
  @Field(() => UFEnum)
  @IsString()
  @IsNotEmpty()
  uf: UFEnum;
  @Field()
  @Validate(ValidationPhone)
  @IsNotEmpty()
  first_phone: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @Validate(ValidationPhone)
  second_phone?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Validate(ValidationPhone)
  third_phone?: string;
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
@InputType()
export class LegalPersonUpdateInput extends PartialType(LegalPersonInput) {}
