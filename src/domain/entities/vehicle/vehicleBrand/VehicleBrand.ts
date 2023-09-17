import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type VehicleModel } from '../vehicleModel/VehicleModel';

export interface IVehicleBrand {
  id?: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  VehicleModels?: VehicleModel[];
}

export class VehicleBrand extends Entity {
  private _id: string;
  private props: IVehicleBrand;
  constructor(
    props: Replace<IVehicleBrand, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      updated_at: new Date(),
      created_at: props.created_at ?? new Date(),
      id: this._id,
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
        field: this.props.created_by,
        fieldName: 'Created By',
        maxLength: 1000,
      },
      {
        field: this.props.updated_by,
        fieldName: 'Updated By',
        maxLength: 1000,
      },
    );
    this.notification.requiredField('VehicleBrand', fieldsValidation);
  }

  public get id(): string {
    return this.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
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
