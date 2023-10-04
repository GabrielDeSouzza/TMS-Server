import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type Vehicle } from '../../vehicle/vehicle/Vehicle';
import { type MaintenanceCompany } from '../MaintenanceCompany/MaintenanceCompany';
import { type TypeOfMaintenance } from '../MaintenanceProcess/TypeOfMaintenance';

interface IMaintenance {
  id?: string;
  MaintenanceCompany: MaintenanceCompany;
  maintenance_company_cnpj?: string;
  Vehicle: Vehicle;
  plate?: string;
  TypeOfMaintenance: TypeOfMaintenance;
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
    this.props.MaintenanceCompany.validate();
    this.props.TypeOfMaintenance.validate();
    this.props.Vehicle.validate();
    this.notification.requiredField('Maintenance', fieldsValidation);
  }

  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public set MaintenanceCompany(maintenanceCompany: MaintenanceCompany) {
    this.props.MaintenanceCompany = maintenanceCompany;
  }

  public get MaintenanceCompany(): MaintenanceCompany {
    return this.props.MaintenanceCompany;
  }

  public set maintenance_company_cnpj(
    maintenanceCompanyCnpj: string | undefined,
  ) {
    this.props.maintenance_company_cnpj = maintenanceCompanyCnpj;
  }

  public get maintenance_company_cnpj(): string | undefined {
    return this.props.maintenance_company_cnpj;
  }

  public set Vehicle(vehicle: Vehicle) {
    this.props.Vehicle = vehicle;
  }

  public get Vehicle(): Vehicle {
    return this.props.Vehicle;
  }

  public set plate(plate: string | undefined) {
    this.props.plate = plate;
  }

  public get plate(): string | undefined {
    return this.props.plate;
  }

  public set TypeOfMaintenance(typeOfMaintenance: TypeOfMaintenance) {
    this.props.TypeOfMaintenance = typeOfMaintenance;
  }

  public get TypeOfMaintenance(): TypeOfMaintenance {
    return this.props.TypeOfMaintenance;
  }
}
