import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IVehicleBodywork {
  id?: string;
  name: string;
  axles: number;
  mass: number;
  volume: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

export class VehicleBodywork extends Entity {
  private props: IVehicleBodywork;

  constructor(
    props: Replace<IVehicleBodywork, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.name,
        fieldName: 'Name',
        maxLength: 80,
      },
      {
        field: this.props.mass,
        fieldName: 'Mass',
        maxLength: 999_000,
        minLength: 0,
      },
      {
        field: this.props.axles,
        fieldName: 'Axles',
        maxLength: 1000,
        minLength: 0,
      },
      {
        field: this.props.mass,
        fieldName: 'Mass',
        maxLength: 999_000,
        minLength: 0,
      },
      {
        field: this.props.volume,
        fieldName: 'Volume',
        maxLength: 999_000,
        minLength: 0,
      },
    );
    this.notification.requiredField('VehicleBodywork', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
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

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }
  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }

  public set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
}
