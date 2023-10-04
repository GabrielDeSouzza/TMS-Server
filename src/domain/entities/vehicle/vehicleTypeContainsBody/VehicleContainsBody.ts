import { randomUUID } from 'node:crypto';

import { type IValidationField } from 'domain/shared/notification/Notification';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IVehicleTypeContainsBody {
  id?: string;
  vehicle_bodywork_id: string;
  vehicle_type_id: string;
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
        field: this.props.created_at,
        fieldName: 'created_at',
        maxLength: 80,
      },
      {
        field: this.props.updated_at,
        fieldName: 'updated_at',
        maxLength: 80,
      },
      {
        field: this.props.vehicle_bodywork_id,
        fieldName: 'Vehicle Bodywork Id',
        maxLength: 1000,
      },
      {
        field: this.props.vehicle_type_id,
        fieldName: 'Vehicle Type Id',
        maxLength: 1000,
      },
    );
    this.notification.requiredField('VehicleContainsBody', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public get vehicle_type_id(): string {
    return this.props.vehicle_type_id;
  }
  public set vehicleType(vehicle_type_id: string) {
    this.props.vehicle_type_id = vehicle_type_id;
  }

  public get vehicle_bodywork_id(): string {
    return this.props.vehicle_bodywork_id;
  }
  public set vehicle_bodywork_id(vehicle_bodywork_id: string) {
    this.vehicle_bodywork_id = vehicle_bodywork_id;
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
