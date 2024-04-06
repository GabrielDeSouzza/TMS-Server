import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export enum TypeMaintenanceProps {
  CORRECTIVE_MAINTENANCE = 'MANUTENÇÃO CORRETIVA',
  PREVENTIVE_MAINTENANCE = 'MANUTENÇÃO PREVENTIVA',
  PREDICTIVE_MAINTENANCE = 'MANUTENÇÃO PREDITIVA',
  DETECTIVE_MAINTENANCE = 'MANUTENÇÃO DETECTIVA',
}

export interface ITypeOfMaintenance {
  id?: string;
  description: string;
  typeMaintenance: TypeMaintenanceProps;
  updated_at?: Date;
  created_at?: Date;
  created_by: string;
  updated_by: string;
}

export class TypeOfMaintenance extends Entity {
  private props: ITypeOfMaintenance;

  constructor(
    props: Replace<
      ITypeOfMaintenance,
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
        field: this.description,
        fieldName: 'Description',
        maxLength: 100,
      },
      {
        field: this.props.typeMaintenance,
        fieldName: 'Type Maintenance',
        maxLength: 50,
      },
    );

    this.notification.requiredField('TypeOfMaintenance', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set typeMaintenance(typeMaintenance: TypeMaintenanceProps) {
    this.props.typeMaintenance = typeMaintenance;
  }

  public get typeMaintenance(): TypeMaintenanceProps {
    return this.props.typeMaintenance;
  }

  public set updated_at(updatedAt: Date) {
    this.props.updated_at = updatedAt;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(createdAt: Date) {
    this.props.created_at = createdAt;
  }

  public get created_at(): Date {
    return this.props.created_at;
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
