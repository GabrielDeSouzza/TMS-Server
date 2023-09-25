import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface ILegalPerson {
  fantasy_name: string;
  cnpj: string;
  state_registration: string;
  corporate_name: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  uf: string;
  first_phone: string;
  second_phone?: string;
  third_phone?: string;
  email: string;
  updated_at: Date;
  created_at: Date;
}

export class LegalPerson extends Entity {
  private _id: string;
  private props: ILegalPerson;

  constructor(
    props: Replace<ILegalPerson, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      updated_at: new Date(),
      created_at: props.created_at ?? new Date(),
    };
    this.validate();

    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();

      throw new NotificationError(errors);
    }
  }

  validate() {
    const fieldsValidation: Array<IValidationField> =
      new Array<IValidationField>();
    fieldsValidation.push(
      {
        field: this.fantasy_name,
        fieldName: 'Fantasy Name',
        maxLength: 100,
      },
      {
        field: this.cnpj,
        fieldName: 'CNPJ',
        maxLength: 14,
        minLength: 14,
      },
      {
        field: this.state_registration,
        fieldName: 'State Registration',
        maxLength: 15,
        minLength: 8,
      },
      {
        field: this.corporate_name,
        fieldName: 'Corporate Name',
        maxLength: 80,
      },
      {
        field: this.public_place,
        fieldName: 'Public Place',
        maxLength: 80,
      },
      {
        field: this.address_number,
        fieldName: 'Address Number',
        maxLength: 10,
      },
      {
        field: this.neighborhood,
        fieldName: 'Neighborhood',
        maxLength: 80,
      },
      {
        field: this.complement,
        fieldName: 'Complement',
        maxLength: 80,
      },
      {
        field: this.city,
        fieldName: 'City',
        maxLength: 80,
      },
      {
        field: this.uf,
        fieldName: 'UF',
        maxLength: 2,
        minLength: 2,
      },
      {
        field: this.first_phone,
        fieldName: 'First Phone',
        maxLength: 20,
        minLength: 11,
      },
      {
        field: this.second_phone,
        fieldName: 'Second Phone',
        maxLength: 20,
        minLength: 11,
        isNullAble: true,
      },
      {
        field: this.third_phone,
        fieldName: 'Third Phone',
        maxLength: 20,
        minLength: 11,
        isNullAble: true,
      },
      {
        field: this.email,
        fieldName: 'Email',
        maxLength: 80,
      },
    );
    this.notification.requiredField('LegalPerson', fieldsValidation);
  }

  public get id(): string {
    return this._id;
  }
  public set fantasy_name(fantasyName: string) {
    this.props.fantasy_name = fantasyName;
  }

  public get fantasy_name(): string {
    return this.props.fantasy_name;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string {
    return this.props.cnpj;
  }

  public set state_registration(stateRegistration: string) {
    this.props.state_registration = stateRegistration;
  }

  public get state_registration(): string {
    return this.props.state_registration;
  }

  public set corporate_name(corporateName: string) {
    this.props.corporate_name = corporateName;
  }

  public get corporate_name(): string {
    return this.props.corporate_name;
  }

  public set public_place(publicPlace: string) {
    this.props.public_place = publicPlace;
  }

  public get public_place(): string {
    return this.props.public_place;
  }

  public set address_number(addressNumber: string) {
    this.props.address_number = addressNumber;
  }

  public get address_number(): string {
    return this.props.address_number;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set complement(complement: string | undefined) {
    this.props.complement = complement;
  }

  public get complement(): string | undefined {
    return this.props.complement;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city(): string {
    return this.props.city;
  }

  public set uf(uf: string) {
    this.props.uf = uf;
  }

  public get uf(): string {
    return this.props.uf;
  }

  public set first_phone(firstPhone: string) {
    this.props.first_phone = firstPhone;
  }

  public get first_phone(): string {
    return this.props.first_phone;
  }

  public set second_phone(secondPhone: string | undefined) {
    this.props.second_phone = secondPhone;
  }

  public get second_phone(): string | undefined {
    return this.props.second_phone;
  }

  public set third_phone(thirdPhone: string | undefined) {
    this.props.third_phone = thirdPhone;
  }

  public get third_phone(): string | undefined {
    return this.props.third_phone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
