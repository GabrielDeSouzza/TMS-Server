import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IMaintenance {
  id?: string;
  maintenance_company_id: string;
  vehicle_id: string;
  type_of_maintenance_id: string;
  finished_at?: Date;
  updated_by: string;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Maintenance extends Entity {
  private props: IMaintenance;

  constructor(
    props: Replace<IMaintenance, { created_at?: Date; updated_at?: Date }>,
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
        field: this.props.maintenance_company_id,
        fieldName: ' Maintenance Company',
        maxLength: 100,
      },
      {
        field: this.props.type_of_maintenance_id,
        fieldName: 'Type of Maintenance',
        maxLength: 1000,
      },
      {
        field: this.props.vehicle_id,
        fieldName: 'Vehciel',
        maxLength: 1000,
      },
    );

    this.notification.requiredField('Maintenance', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set maintenance_company_id(maintenance_company_id: string) {
    this.props.maintenance_company_id = maintenance_company_id;
  }

  public get maintenance_company_id(): string | undefined {
    return this.props.maintenance_company_id;
  }

  public set vehicle_id(vehicle_id: string) {
    this.props.vehicle_id = vehicle_id;
  }

  public get vehicle_id(): string {
    return this.props.vehicle_id;
  }

  public set type_of_maintenance_id(type_of_maintenance_id: string) {
    this.props.vehicle_id = type_of_maintenance_id;
  }

  public get type_of_maintenance_id(): string {
    return this.props.type_of_maintenance_id;
  }

  public set finished_at(finished_at: Date) {
    this.props.finished_at = finished_at;
  }

  public get finished_at(): Date {
    return this.props.finished_at;
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

  get updated_by(): string {
    return this.props.updated_by;
  }

  set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  get created_by(): string {
    return this.props.created_by;
  }

  set created_by(created_by: string) {
    this.props.created_by = created_by;
  }
}
