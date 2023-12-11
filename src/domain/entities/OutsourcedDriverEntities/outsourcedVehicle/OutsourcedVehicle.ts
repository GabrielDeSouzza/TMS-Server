import { randomUUID } from 'node:crypto';

import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Replace } from 'helpers/Replace';

export interface IOutsourcedVehicle {
  id?: string;
  vehicle_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

export class OutsourcedVehicle extends Entity {
  private props: IOutsourcedVehicle | Partial<IOutsourcedVehicle>;

  constructor(
    props: Replace<
      IOutsourcedVehicle | Partial<IOutsourcedVehicle>,
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
    fieldsValidation.push({
      field: this.vehicle_id,
      fieldName: 'Vehicle ID',
      maxLength: 1000,
    });
    this.notification.requiredField('OutsourcedDriver', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public get vehicle_id(): string {
    return this.props.vehicle_id;
  }
  public set vehicle_id(vehicle_id: string) {
    this.props.vehicle_id = vehicle_id;
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
