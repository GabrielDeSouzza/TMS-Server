import { type LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';
import { type PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';
import { type LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';
import { type LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';
import { Entity } from 'domain/shared/entities/Entity';
import { type IValidationField } from 'domain/shared/notification/Notification';

import { type Manifest } from '../Manifest';

export interface IGenerateManifest {
  Manifest: Manifest;
  QuoteTable: LegalClientQuoteTable | PhysicalCustomerQuoteTable;
  Driver: NaturalPerson;
  OrderProcessing: OrderProcessing;
  Cte: LegalClientCte | PhysicalCustomerCte;
  CarrierCompany: LegalPerson;
  Sender: LegalClient | NaturalPerson;
  Recipient: LegalClient | NaturalPerson;
  Order: LegalClientOrder | PhysicalCustomerOrder;
}

export class GenerateManifest extends Entity {
  private props: IGenerateManifest;

  validate() {
    const fieldsValidation: Array<IValidationField> =
      new Array<IValidationField>();
    fieldsValidation.push();

    this.notification.requiredField('Manifest', fieldsValidation);
  }

  public set Manifest(Manifest: Manifest) {
    this.props.Manifest = Manifest;
  }

  public get Manifest(): Manifest {
    return this.props.Manifest;
  }

  public set QuoteTable(
    QuoteTable: LegalClientQuoteTable | PhysicalCustomerQuoteTable,
  ) {
    this.props.QuoteTable = QuoteTable;
  }

  public get QuoteTable(): LegalClientQuoteTable | PhysicalCustomerQuoteTable {
    return this.props.QuoteTable;
  }

  public set Driver(Driver: NaturalPerson) {
    this.props.Driver = Driver;
  }

  public get Driver(): NaturalPerson {
    return this.props.Driver;
  }

  public set OrderProcessing(OrderProcessing: OrderProcessing) {
    this.props.OrderProcessing = OrderProcessing;
  }

  public get OrderProcessing(): OrderProcessing {
    return this.props.OrderProcessing;
  }

  public set Cte(Cte: LegalClientCte | PhysicalCustomerCte) {
    this.props.Cte = Cte;
  }

  public get Cte(): LegalClientCte | PhysicalCustomerCte {
    return this.props.Cte;
  }

  public set CarrierCompany(CarrierCompany: LegalPerson) {
    this.props.CarrierCompany = CarrierCompany;
  }

  public get CarrierCompany(): LegalPerson {
    return this.props.CarrierCompany;
  }

  public set Sender(Sender: LegalClient | NaturalPerson) {
    this.props.Sender = Sender;
  }

  public get Sender(): LegalClient | NaturalPerson {
    return this.props.Sender;
  }

  public set Recipient(Recipient: LegalClient | NaturalPerson) {
    this.props.Recipient = Recipient;
  }

  public get Recipient(): LegalClient | NaturalPerson {
    return this.props.Recipient;
  }

  public set Order(Order: LegalClientOrder | PhysicalCustomerOrder) {
    this.props.Order = Order;
  }

  public get Order(): LegalClientOrder | PhysicalCustomerOrder {
    return this.props.Order;
  }
}
