import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { type VehicleType } from '../vehicleTypes/VehicleTypes';

interface IVehicleModel {
  name: string;
  weight: number;
  capacity_max: number;
  axles: number;
  capacity_per_axle?: number;
  brand_id?: string;
  type_id?: string;
  created_at: Date;
  updated_at: Date;
  VehicleBrand: VehicleBrand;
  VehicleType: VehicleType;
}

export class VehicleModel extends Entity {
  private _id: string;
  private props: IVehicleModel;

  constructor(
    props: Replace<IVehicleModel, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.name,
        fieldName: 'Name',
        maxLength: 80,
      },
      {
        field: this.props.weight,
        fieldName: 'Weigh',
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
        field: this.props.capacity_max,
        minLength: 0,
        fieldName: 'Max capacity ',
        maxLength: 999_000,
      },
      {
        field: this.weight,
        fieldName: 'Weight',
        maxLength: 999_000,
        minLength: 0,
      },
      {
        field: this.capacity_per_axle,
        fieldName: 'Capacity per Axle',
        isNullAble: true,
        maxLength: 10,
      },
    );
    this.props.VehicleBrand.validate();
    this.props.VehicleType.validate();
    this.notification.requiredField('VehicleModel', fieldsValidation);
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

  public set weight(weight: number) {
    this.props.weight = weight;
  }

  public get weight(): number {
    return this.props.weight;
  }

  public set capacity_max(capacity_max: number) {
    this.props.capacity_max = capacity_max;
  }

  public get capacity_max(): number {
    return this.props.capacity_max;
  }

  public set axles(axles: number) {
    this.props.axles = axles;
  }

  public get axles(): number {
    return this.props.axles;
  }
  public set capacity_per_axle(capacity_per_axle: number) {
    this.props.capacity_per_axle = capacity_per_axle;
  }

  public get capacity_per_axle(): number {
    return this.props.capacity_per_axle;
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
