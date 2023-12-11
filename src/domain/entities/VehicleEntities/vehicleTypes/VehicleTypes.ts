import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import {
  type IVehicleTypeContainsBody,
  type VehicleTypeContainsBody,
} from '../vehicleTypeContainsBody/VehicleContainsBody';

export interface IVehicleType {
  id?: string;
  name: string;
  bodyWork: boolean;
  body_work_id?: string[];
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  VehicleTypeContainsBody?:
    | VehicleTypeContainsBody[]
    | IVehicleTypeContainsBody[];
}

export class VehicleType extends Entity {
  private props: IVehicleType | Partial<IVehicleType>;

  constructor(
    props: Replace<
      IVehicleType | Partial<IVehicleType>,
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
      field: this.props.name,
      fieldName: 'Name',
      maxLength: 80,
    });
    this.notification.requiredField('VehicleType', fieldsValidation);
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

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
  public set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }
  public get updated_by(): string {
    return this.props.updated_by;
  }
  public set bodyWork(bodywork: boolean) {
    this.props.bodyWork = bodywork;
  }
  public get bodyWork(): boolean {
    return this.props.bodyWork;
  }
  public set body_work_id(body_work_id: string[] | undefined) {
    this.props.body_work_id = body_work_id;
  }
  public get body_work_id(): string[] | undefined {
    return this.props.body_work_id;
  }
  public set VehicleTypeContainsBody(
    VehicleTypeContainsBody:
      | VehicleTypeContainsBody[]
      | IVehicleTypeContainsBody[]
      | undefined,
  ) {
    this.props.VehicleTypeContainsBody = VehicleTypeContainsBody;
  }
  public get VehicleTypeContainsBody():
    | VehicleTypeContainsBody[]
    | IVehicleTypeContainsBody[]
    | undefined {
    return this.props.VehicleTypeContainsBody;
  }
}
