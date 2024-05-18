import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

import { type LegalClientCte } from '../LegalClientCte/LegalClientCte';

interface IExpensesCte {
  value: number;
  expenseName: string;
}

export interface ICtePhyscialCustomerPdf {
  expenses: IExpensesCte[];
  senderLegalPerson: LegalPerson;
  senderNaturalPerson: NaturalPerson;
  recipientLegalPerson?: LegalPerson;
  recipientNaturalPerson?: NaturalPerson;
  cteData: LegalClientCte;
  carrierCompany: LegalPerson;
  physicalCustomer: NaturalPerson;
  rntrc: string;
  orderData: PhysicalCustomerQuoteTable;
}

export class CtePhyscialCustomerPdf {
  private props: ICtePhyscialCustomerPdf;

  constructor(props: ICtePhyscialCustomerPdf) {
    this.props = {
      ...props,
    };
  }

  public get expenses(): IExpensesCte[] {
    return this.props.expenses;
  }
  public set expenses(expense: IExpensesCte) {
    this.props.expenses.push(expense);
  }

  public get orderData(): PhysicalCustomerQuoteTable {
    return this.props.orderData;
  }
  public set orderData(orderData: PhysicalCustomerQuoteTable) {
    this.props.orderData = orderData;
  }

  public get physicalCustomer(): NaturalPerson {
    return this.props.physicalCustomer;
  }
  public set physicalCustomer(physicalCustomer: NaturalPerson) {
    this.props.physicalCustomer = physicalCustomer;
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
