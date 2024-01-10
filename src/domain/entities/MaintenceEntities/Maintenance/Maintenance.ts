import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

interface IMaintenance {
  id?: string;
  maintenance_company_cnpj?: string;
  plate?: string;
  created_at: Date;
  updated_at: Date;
}

export class Maintenance extends Entity {
  private _id: string;
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
        field: this.props.maintenance_company_cnpj,
        fieldName: 'CNPJ Maintenance Company',
        maxLength: 14,
        minLength: 14,
        isNullAble: true,
      },
      {
        field: this.props.plate,
        fieldName: 'CNPJ Maintenance Company',
        maxLength: 8,
        minLength: 6,
        isNullAble: true,
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

  public set maintenance_company_cnpj(
    maintenanceCompanyCnpj: string | undefined,
  ) {
    this.props.maintenance_company_cnpj = maintenanceCompanyCnpj;
  }

  public get maintenance_company_cnpj(): string | undefined {
    return this.props.maintenance_company_cnpj;
  }

  public set plate(plate: string | undefined) {
    this.props.plate = plate;
  }

  public get plate(): string | undefined {
    return this.props.plate;
  }
}
