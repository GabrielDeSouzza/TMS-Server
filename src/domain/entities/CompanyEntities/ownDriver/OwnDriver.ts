import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';

export interface IOwnDriver {
  id?: string;
  natural_person_id: string;
  cnh: string;
  cnh_category: string;
  cnh_expiration: Date;
  company_vehicle: boolean;
  course_mopp: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

export class OwnDriver extends Entity {
  private props: IOwnDriver | Partial<IOwnDriver>;

  constructor(
    props: Replace<
      IOwnDriver | Partial<IOwnDriver>,
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

  public set cnh_category(cnhCategory: string) {
    this.props.cnh_category = cnhCategory;
  }

  public get cnh_category(): string {
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

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
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
  public set created_by(updated_by: string) {
    this.props.created_by = updated_by;
  }

  public get created_by(): string {
    return this.props.created_by;
  }
}
