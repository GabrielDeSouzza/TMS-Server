import { randomUUID } from 'node:crypto';

import { type LegalContractor } from 'domain/entities/contractors/legalContractor/LegalContractor';
import { type CarrierCompany } from 'domain/entities/legalPerson/carrierCompany/CarrierCompany';
import { type CorporateClient } from 'domain/entities/legalPerson/CorporateClient/CorporateClient';
import { Entity } from 'domain/shared/entities/Entity';
import { type Replace } from 'domain/shared/helpers/Replace';
import { type IValidationField } from 'domain/shared/notification/Notification';
import { NotificationError } from 'domain/shared/notification/NotificationError';

interface ICiotForCorporateClient {
  ciot: string;
  emission_date: Date;
  CorporateClient: CorporateClient;
  cnpj?: string;
  CarrierCompany: CarrierCompany;
  carrier_cnpj?: string;
  LegalContractor: LegalContractor;
  updated_at: Date;
  created_at: Date;
}

export class CiotForCorporateClient extends Entity {
  private _id: string;
  private props: ICiotForCorporateClient;

  constructor(
    props: Replace<
      ICiotForCorporateClient,
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
    this.notification.requiredField('CiotForLegalPerson', fieldsValidation);
    this.props.CarrierCompany.validate();
    this.props.LegalContractor.validate();
    this.props.CorporateClient.validate();
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

  public set CorporateClient(corporateClient: CorporateClient) {
    this.props.CorporateClient = corporateClient;
  }

  public get CorporateClient(): CorporateClient {
    return this.props.CorporateClient;
  }

  public set cnpj(cnpj: string | undefined) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string | undefined {
    return this.props.cnpj;
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

  public set LegalContractor(legalContractor: LegalContractor) {
    this.props.LegalContractor = legalContractor;
  }

  public get PhysicalContractor(): LegalContractor {
    return this.props.LegalContractor;
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
