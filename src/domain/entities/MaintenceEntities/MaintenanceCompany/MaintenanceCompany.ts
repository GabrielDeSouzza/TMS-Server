import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface IMaintenanceCompany {
  id?: string;
  specialty_maintenance: string;
  legal_person_id?: string;
  created_at: Date;
  updated_at: Date;
}

export class MaintenanceCompany extends Entity {
  private _id: string;
  private props: IMaintenanceCompany;

  constructor(
    props: Replace<
      IMaintenanceCompany,
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
        field: this.props.legal_person_id,
        fieldName: 'CNPJ',
        maxLength: 300,
      },
      {
        field: this.props.specialty_maintenance,
        fieldName: 'Specialty Maintenance',
        maxLength: 80,
      },
    );

    this.notification.requiredField('MaintenanceCompany', fieldsValidation);
  }
  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public set specialty_maintenance(specialtyMaintenance: string) {
    this.props.specialty_maintenance = specialtyMaintenance;
  }

  public get specialty_maintenance(): string {
    return this.props.specialty_maintenance;
  }

  public set LegalPerson(legal_person_id: string) {
    this.props.legal_person_id = legal_person_id;
  }

  public get legal_person_id(): string {
    return this.props.legal_person_id;
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
}
