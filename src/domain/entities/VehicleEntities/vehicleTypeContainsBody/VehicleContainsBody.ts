import { randomUUID } from 'node:crypto';

import { type IValidationField } from 'domain/shared/notification/Notification';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { NotificationError } from '../../../shared/notification/NotificationError';
import {
  type IVehicleBodywork,
  type VehicleBodywork,
} from '../vehicleBodywork/VehicleBodywork';
import {
  type IVehicleType,
  type VehicleType,
} from '../vehicleTypes/VehicleTypes';

export interface IVehicleTypeContainsBody {
  id?: string;
  vehicle_bodywork_id: string;
  vehicle_type_id: string;
  updated_at: Date;
  created_at: Date;
  created_by: string;
  updated_by: string;
  VehicleType?: IVehicleType[] | VehicleType[];
  VehicleBodywork?: IVehicleBodywork[] | VehicleBodywork[] | void[];
}

export class VehicleTypeContainsBody extends Entity {
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
  public set vehicle_type_id(vehicle_type_id: string) {
    this.props.vehicle_type_id = vehicle_type_id;
  }

  public get vehicle_bodywork_id(): string {
    return this.props.vehicle_bodywork_id;
  }
  public set vehicle_bodywork_id(vehicle_bodywork_id: string) {
    this.vehicle_bodywork_id = vehicle_bodywork_id;
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

  public set created_by(created_by: string) {
    this.props.created_by = created_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }
  public set VehicleBodywork(
    VehicleBodywork: VehicleBodywork[] | IVehicleBodywork[] | null | void[],
  ) {
    this.props.VehicleBodywork = VehicleBodywork;
  }

  public get VehicleBodywork():
    | VehicleBodywork[]
    | IVehicleBodywork[]
    | undefined
    | void[] {
    return this.props.VehicleBodywork;
  }
  public set VehicleType(VehicleType: VehicleType[] | IVehicleType[] | null) {
    this.props.VehicleType = VehicleType;
  }

  public get VehicleType(): VehicleType[] | IVehicleType[] | undefined {
    return this.props.VehicleType;
  }
}
