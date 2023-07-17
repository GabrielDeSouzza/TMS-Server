import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type VehicleModel } from '../vehicleModel/VehicleModel';

interface IVehicle {
  plate: string;
  year: string;
  color: string;
  renavam: string;
  rntrc_expiration: string;
  created_at: Date;
  updated_at: Date;
  VehicleModel: VehicleModel;
}

export class Vehicle extends Entity {
  private _id: string;
  private props: IVehicle;

  constructor(
    props: Replace<IVehicle, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.plate,
        fieldName: 'Plate',
        maxLength: 8,
        minLength: 6,
      },
      { field: this.props.color, fieldName: 'Color', maxLength: 20 },
      { field: this.props.renavam, fieldName: 'Renavam', maxLength: 11 },
      {
        field: this.props.rntrc_expiration,
        fieldName: 'Rntrc expitarion',
        maxLength: 4,
      },
      { field: this.props.year, fieldName: 'Year', maxLength: 4 },
    );
    this.notification.requiredField('vehicle', fieldsValidation);
    this.props.VehicleModel.validate();
  }

  public get id(): string {
    return this._id;
  }

  public set plate(plate: string) {
    this.props.plate = plate;
  }

  public get plate(): string {
    return this.props.plate;
  }

  public set year(year: string) {
    this.props.year = year;
  }

  public get year(): string {
    return this.props.year;
  }

  public set color(color: string) {
    this.props.color = color;
  }

  public get color(): string {
    return this.props.color;
  }

  public set renavam(renavam: string) {
    this.props.renavam = renavam;
  }

  public get renavam(): string {
    return this.props.renavam;
  }

  public set rntrc_expiration(rntrc_expiration: string) {
    this.props.rntrc_expiration = rntrc_expiration;
  }

  public get rntrc_expiration(): string {
    return this.props.rntrc_expiration;
  }

  public get VehicleModel(): VehicleModel {
    return this.props.VehicleModel;
  }
  public set VehicleModel(vehicleModel: VehicleModel) {
    this.props.VehicleModel = vehicleModel;
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
