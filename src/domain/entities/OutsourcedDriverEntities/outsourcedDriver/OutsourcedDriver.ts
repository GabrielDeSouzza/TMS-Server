import { randomUUID } from 'node:crypto';

import { type CNH } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

import { type Replace } from 'helpers/Replace';

export interface IOutsourcedDriver {
  id?: string;
  natural_person_id: string;
  cnh: string;
  cnh_category: CNH;
  cnh_expiration: Date;
  company_vehicle: boolean | false;
  course_mopp: boolean;
  outsourced_vehicle_id: string;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
}
export class OutsourcedDriver extends Entity {
  private props: IOutsourcedDriver | Partial<IOutsourcedDriver>;

  constructor(
    props: Replace<
      IOutsourcedDriver | Partial<IOutsourcedDriver>,
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
        field: this.props.cnh,
        fieldName: 'CNH',
        maxLength: 11,
        minLength: 11,
      },
      {
        field: this.props.cnh_category,
        fieldName: 'CNH Category',
        maxLength: 4,
      },
      {
        field: this.props.company_vehicle,
        fieldName: 'Company Vehicle',
        maxLength: 5,
      },
      {
        field: this.props.course_mopp,
        fieldName: 'Course MOPP',
        maxLength: 10,
      },
      {
        field: this.props.cnh_expiration,
        fieldName: 'CNH Expiration',
        maxLength: 4,
        minLength: 4,
      },
    );
    this.notification.requiredField('OutsourcedDriver', fieldsValidation);
  }
  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
  public set natural_person_id(natural_person_id: string) {
    this.props.natural_person_id = natural_person_id;
  }

  public get natural_person_id(): string {
    return this.props.natural_person_id;
  }

  public set cnh(cnh: string) {
    this.props.cnh = cnh;
  }

  public get cnh(): string {
    return this.props.cnh;
  }

  public set cnh_category(cnhCategory: CNH) {
    this.props.cnh_category = cnhCategory;
  }

  public get cnh_category(): CNH {
    return this.props.cnh_category;
  }

  public set cnh_expiration(cnhExpiration: Date) {
    this.props.cnh_expiration = cnhExpiration;
  }

  public get cnh_expiration(): Date {
    return this.props.cnh_expiration;
  }

  public set company_vehicle(companyVehicle: boolean) {
    this.props.company_vehicle = companyVehicle;
  }

  public get company_vehicle(): boolean {
    return this.props.company_vehicle;
  }

  public set course_mopp(courseMopp: boolean) {
    this.props.course_mopp = courseMopp;
  }

  public get course_mopp(): boolean {
    return this.props.course_mopp;
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

  public set outsourced_vehicle_id(outsourced_vehicle_id: string) {
    this.props.outsourced_vehicle_id = outsourced_vehicle_id;
  }

  public get outsourced_vehicle_id(): string {
    return this.props.outsourced_vehicle_id;
  }

  public set updated_by(updated_by: string) {
    this.props.updated_by = updated_by;
  }

  public get updated_by(): string {
    return this.props.updated_by;
  }
  public set created_by(updated_by: string) {
    this.props.created_by = updated_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
}
