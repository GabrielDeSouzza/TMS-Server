import { Field, InputType, PartialType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';

import { type INaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

import { ValidationPhone } from 'infra/CustomValidations/PhoneValidation';
import { UFEnum } from 'infra/graphql/enums/Uf.enum';

@InputType()
export class NaturalPersonInput implements INaturalPerson {
  @Field()
  @IsString()
  @Length(3)
  name: string;
  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  date_birth: Date;
  @Field()
  @IsString()
  @Length(3)
  gender: string;
  @Field()
  @IsString()
  @Length(11)
  cpf: string;
  @Field()
  @IsString()
  @Length(8, 11)
  rg: string;
  @Field()
  @IsString()
  @Length(7)
  cep: string;
  @Field()
  @IsString()
  @Length(3)
  public_place: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  address_number: string;
  @Field()
  @IsString()
  @Length(3)
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
  uf: UFEnum;
  @Field()
  @Validate(ValidationPhone)
  first_phone: string;
  @Field({ nullable: true })
  @Validate(ValidationPhone)
  @IsOptional()
  second_phone?: string;
  @Field({ nullable: true })
  @Validate(ValidationPhone)
  @IsOptional()
  third_phone?: string;
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  nationality: string;
}

@InputType()
export class NaturalPersonUpdate extends PartialType(NaturalPersonInput) {}
