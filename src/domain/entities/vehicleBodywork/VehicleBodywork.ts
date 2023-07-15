import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../shared/entities/Entity';
import { type IValidationField } from '../../shared/notification/Notification';
import { NotificationError } from '../../shared/notification/NotificationError';

interface IVehicleBodywork {
  name: string;
  axles: number;
  mass: number;
  volume: number;
  created_at: Date;
  updated_at: Date;
}

export class VehicleBodywork extends Entity {
  private _id: string;
  private props: IVehicleBodywork;

  constructor(
    props: Replace<IVehicleBodywork, { created_at?: Date; updated_at?: Date }>,
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
        field: this.name,
        fieldName: 'Name',
        maxLength: 80,
      },
      {
        field: this.mass,
        fieldName: 'Mass',
        maxLength: 999_000,
        minLength: 0,
      },
      { field: this.axles, fieldName: 'Axles', maxLength: 1000, minLength: 0 },
      { field: this.mass, fieldName: 'Mass', maxLength: 999_000, minLength: 0 },
      {
        field: this.volume,
        fieldName: 'Volume',
        maxLength: 999_000,
        minLength: 0,
      },
    );
    this.notification.requiredField('VehicleBodywork', fieldsValidation);
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set mass(mass: number) {
    this.props.mass = mass;
  }

  public get mass(): number {
    return this.props.mass;
  }

  public set axles(axles: number) {
    this.props.axles = axles;
  }

  public get axles(): number {
    return this.props.axles;
  }

  public set volume(volume: number) {
    this.props.volume = volume;
  }

  public get volume(): number {
    return this.props.volume;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updated_at;
  }

  public get createdAt(): Date {
    return this.props.created_at;
  }
}
