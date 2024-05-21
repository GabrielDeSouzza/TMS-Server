import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

import { type LegalClientCte } from '../LegalClientCte/LegalClientCte';

export interface ICteLegalClientPdf {
  senderLegalPerson: LegalPerson;
  senderNaturalPerson: NaturalPerson;
  recipientLegalPerson?: LegalPerson;
  recipientNaturalPerson?: NaturalPerson;
  cteData: LegalClientCte;
  carrierCompany: LegalPerson;
  legalClient: LegalPerson;
  rntrc: string;
  orderData: LegalClientOrder;
  quoteData: LegalClientQuoteTable;
  autorizationDate: Date;
}

export class CteLegalClientPdf {
  private props: ICteLegalClientPdf;

  constructor(props: ICteLegalClientPdf) {
    this.props = {
      ...props,
    };
  }

  public get orderData(): LegalClientOrder {
    return this.props.orderData;
  }
  public set orderData(orderData: LegalClientOrder) {
    this.props.orderData = orderData;
  }

  public get autorizationDate(): Date {
    return this.props.autorizationDate;
  }
  public set autorizationDate(autorizationDate: Date) {
    this.props.autorizationDate = autorizationDate;
  }

  public get quoteData(): LegalClientQuoteTable {
    return this.props.quoteData;
  }
  public set quoteData(orderData: LegalClientQuoteTable) {
    this.props.quoteData = orderData;
  }

  public get legalClient(): LegalPerson {
    return this.props.legalClient;
  }
  public set legalClient(legalClient: LegalPerson) {
    this.props.legalClient = legalClient;
  }
  public get cteData(): LegalClientCte {
    return this.props.cteData;
  }
  public set cteData(cteData: LegalClientCte) {
    this.props.cteData = cteData;
  }

  public get recipientLegalPerson(): LegalPerson {
    return this.props.recipientLegalPerson;
  }
  public set recipientLegalPerson(recipient: LegalPerson) {
    this.props.recipientLegalPerson = recipient;
  }
  public get recipientNaturalPerson(): NaturalPerson {
    return this.props.recipientNaturalPerson;
  }
  public set recipientNaturalPerson(recipient: NaturalPerson) {
    this.props.recipientNaturalPerson = recipient;
  }
  public get senderLegalPerson(): LegalPerson {
    return this.props.senderLegalPerson;
  }
  public set senderLegalPerson(sender: LegalPerson) {
    this.props.senderLegalPerson = sender;
  }

  public get senderNaturalPerson(): NaturalPerson {
    return this.props.senderNaturalPerson;
  }
  public set senderNaturalPerson(sender: NaturalPerson) {
    this.props.senderNaturalPerson = sender;
  }

  public get carrierCompany(): LegalPerson {
    return this.props.carrierCompany;
  }
  public set carrierCompany(carrierCompany: LegalPerson) {
    this.props.carrierCompany = carrierCompany;
  }

  public get rntrc(): string {
    return this.props.rntrc;
  }
  public set rntrc(rntrc: string) {
    this.props.rntrc = rntrc;
  }
}
