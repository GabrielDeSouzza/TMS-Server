import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type OutsourcedVehicle } from '../../vehicleEntities/outsourcedVehicle/OutsourcedVehicle';
import { type NaturalPerson } from '../naturalPerson/NaturalPerson';

interface IOwnsourcedDriver {
  NaturalPerson: NaturalPerson;
  cnh: string;
  cnh_category: string;
  cnh_expiration: number;
  company_vehicle: boolean | false;
  course_mopp: boolean;
  created_at: Date;
  updated_at: Date;
  OutsourcedVehicle: OutsourcedVehicle;
  cpf?: string;
}
export class OwnsourcedDriver extends Entity {
  private _id: string;
  private props: IOwnsourcedDriver;

  constructor(
    props: Replace<IOwnsourcedDriver, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    super();

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
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
      {
        field: this.props.cpf,
        fieldName: 'CPF',
        maxLength: 11,
        minLength: 11,
        isNullAble: true,
      },
    );
    this.notification.requiredField('OutsourcedDriver', fieldsValidation);
    this.props.OutsourcedVehicle.validate();
    this.props.NaturalPerson.validate();
  }

  public set NaturalPerson(naturalPerson: NaturalPerson) {
    this.props.NaturalPerson = naturalPerson;
  }

  public get NaturalPerson(): NaturalPerson {
    return this.props.NaturalPerson;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
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

  public set cnh_expiration(cnhExpiration: number) {
    this.props.cnh_expiration = cnhExpiration;
  }

  public get cnh_expiration(): number {
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

  public set OutsourcedVehicle(outsourcedVehicle: OutsourcedVehicle) {
    this.props.OutsourcedVehicle = outsourcedVehicle;
  }

  public get OutsourcedVehicle(): OutsourcedVehicle {
    return this.props.OutsourcedVehicle;
  }
}
