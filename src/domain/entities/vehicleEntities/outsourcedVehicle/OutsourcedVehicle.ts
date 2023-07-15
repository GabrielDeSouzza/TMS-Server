import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type Vehicle } from '../vehicle/Vehicle';

interface IOutsourcedVehicle {
  Vehicle: Vehicle;
  created_at: Date;
  updated_at: Date;
  //OutsourcedDriver
}

export class OutsourcedVehicle extends Entity {
  private _id: string;
  private props: IOutsourcedVehicle;

  constructor(
    props: Replace<
      IOutsourcedVehicle,
      { created_at?: Date; updated_at?: Date }
    >,
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
    this.Vehicle.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get Vehicle(): Vehicle {
    return this.props.Vehicle;
  }
  public set Vehicle(vehicle: Vehicle) {
    this.props.Vehicle = vehicle;
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
