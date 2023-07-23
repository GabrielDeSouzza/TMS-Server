import { randomUUID } from 'node:crypto';

import { type Replace } from 'helpers/Replace';

import { Entity } from '../../../shared/entities/Entity';
import { type IValidationField } from '../../../shared/notification/Notification';
import { NotificationError } from '../../../shared/notification/NotificationError';
import { type PhysicalCustomer } from '../../clientsEntities/physicalCustomer/PhysicalCustomer';
import { type PhysicalContractor } from '../../contractorsEntities/physicalContractor/PhysicalContractor';
import { type CarrierCompany } from '../../legalPersonEntities/carrierCompany/CarrierCompany';

interface ICiotForPhysicalCustomer {
  ciot: string;
  emission_date: Date;
  PhysicalCustomer: PhysicalCustomer;
  cpf?: string;
  CarrierCompany: CarrierCompany;
  carrier_cnpj?: string;
  PhysicalContractor: PhysicalContractor;
  updated_at: Date;
  created_at: Date;
}

export class CiotForPhysicalCustomer extends Entity {
  private _id: string;
  private props: ICiotForPhysicalCustomer;

  constructor(
    props: Replace<
      ICiotForPhysicalCustomer,
      { created_at?: Date; updated_at?: Date }
    >,
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
        field: this.props.ciot,
        fieldName: 'CIOT',
        maxLength: 20,
      },
      {
        field: this.props.emission_date,
        fieldName: 'Emission Date',
        maxLength: 20,
      },
      {
        field: this.props.carrier_cnpj,
        fieldName: 'Carrier CNPJ',
        maxLength: 14,
        minLength: 14,
        isNullAble: true,
      },
    );
    this.notification.requiredField(
      'CiotForPhysicalCustomer',
      fieldsValidation,
    );
  }

  public get id(): string {
    return this._id;
  }
  public set ciot(ciot: string) {
    this.props.ciot = ciot;
  }

  public get ciot(): string {
    return this.props.ciot;
  }

  public set emission_date(emissionDate: Date) {
    this.props.emission_date = emissionDate;
  }

  public get emission_date(): Date {
    return this.props.emission_date;
  }

  public set PhysicalCustomer(physicalCustomer: PhysicalCustomer) {
    this.props.PhysicalCustomer = physicalCustomer;
  }

  public get PhysicalCustomer(): PhysicalCustomer {
    return this.props.PhysicalCustomer;
  }

  public set cpf(cpf: string | undefined) {
    this.props.cpf = cpf;
  }

  public get cpf(): string | undefined {
    return this.props.cpf;
  }

  public set CarrierCompany(carrierCompany: CarrierCompany) {
    this.props.CarrierCompany = carrierCompany;
  }

  public get CarrierCompany(): CarrierCompany {
    return this.props.CarrierCompany;
  }

  public set carrier_cnpj(carrierCnpj: string) {
    this.props.carrier_cnpj = carrierCnpj;
  }

  public get carrier_cnpj(): string {
    return this.props.carrier_cnpj;
  }

  public set PhysicalContractor(physicalContractor: PhysicalContractor) {
    this.props.PhysicalContractor = physicalContractor;
  }

  public get PhysicalContractor(): PhysicalContractor {
    return this.props.PhysicalContractor;
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
}
