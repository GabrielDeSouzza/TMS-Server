import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface IRoute {
  id?: string;
  cep: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  legalClientOrderId?: string;
  physicalCustomerOrderId?: string;
  city: string;
  uf: string;
  created_at: Date;
  updated_at: Date;
}

export class Route extends Entity {
  private _id: string;
  private props: IRoute;

  constructor(
    props: Replace<IRoute, { created_at?: Date; updated_at?: Date }>,
  ) {
    super();
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
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
        field: this.cep,
        fieldName: 'CEP',
        maxLength: 8,
        minLength: 8,
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
        isNullAble: true,
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
    );
    this.notification.requiredField('Route', fieldsValidation);
  }
  get id(): string | undefined {
    return this.props.id;
  }

  get cep(): string {
    return this.props.cep;
  }

  set cep(cep: string) {
    this.props.cep = cep;
  }

  get public_place(): string {
    return this.props.public_place;
  }

  set public_place(public_place: string) {
    this.props.public_place = public_place;
  }

  get address_number(): string {
    return this.props.address_number;
  }

  set address_number(address_number: string) {
    this.props.address_number = address_number;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  set complement(complement: string | undefined) {
    this.props.complement = complement;
  }

  get legalClientOrderId(): string | undefined {
    return this.props.legalClientOrderId;
  }

  set legalClientOrderId(legalClientOrderId: string | undefined) {
    this.props.legalClientOrderId = legalClientOrderId;
  }

  get physicalCustomerOrderId(): string | undefined {
    return this.props.physicalCustomerOrderId;
  }

  set physicalCustomerOrderId(physicalCustomerOrderId: string | undefined) {
    this.props.physicalCustomerOrderId = physicalCustomerOrderId;
  }

  get city(): string {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get uf(): string {
    return this.props.uf;
  }

  set uf(uf: string) {
    this.props.uf = uf;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }
}
