import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type VehicleBodywork } from '../vehicleBodywork/VehicleBodywork';
import { type VehicleType } from '../vehicleTypes/VehicleTypes';

interface IVehicleTypeContainsBody {
  VehicleBodywork: VehicleBodywork;
  VehicleType: VehicleType;
  updated_at: Date;
  created_at: Date;
}

export class VehicleTypeContainsBody extends Entity {
  private _id: string;
  private props: IVehicleTypeContainsBody;

  constructor(
    props: Replace<
      IVehicleTypeContainsBody,
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
    this.vehicleBodywork.validate();
    this.vehicleType.validate();
  }

  public get vehicleType(): VehicleType {
    return this.props.VehicleType;
  }
  public set vehicleType(vehicleType: VehicleType) {
    this.vehicleType = vehicleType;
  }

  public get vehicleBodywork(): VehicleBodywork {
    return this.props.VehicleBodywork;
  }
  public set vehicleBodywork(vehicleBodywork: VehicleBodywork) {
    this.vehicleBodywork = vehicleBodywork;
  }
  public get id(): string {
    return this._id;
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
