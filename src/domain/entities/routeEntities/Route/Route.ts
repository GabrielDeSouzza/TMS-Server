import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface IRoute {
  cep: string;
  public_place: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
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

  public set cep(cep: string) {
    this.props.cep = cep;
  }

  public get cep(): string {
    return this.props.cep;
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

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
