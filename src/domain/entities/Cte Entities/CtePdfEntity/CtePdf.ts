import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

import { type LegalClientCte } from '../LegalClientCte/LegalClientCte';
import { type PhysicalCustomerCte } from '../PhysicalCustomerCte/PhysicalCustomerCte';

interface IExpensesCte {
  value: number;
  expenseName: string;
}

export interface ICtePdf {
  expenses: IExpensesCte[];
  sender: LegalPerson | NaturalPerson;
  recipient: LegalPerson | NaturalPerson;
  cteData: PhysicalCustomerCte | LegalClientCte;
  carrierCompany: LegalPerson;
  rntrc: string;
}

export class CtePdf {
  private props: ICtePdf;

  constructor(props: ICtePdf) {
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
  public get cteData(): PhysicalCustomerCte | LegalClientCte {
    return this.props.cteData;
  }
  public set cteData(cteData: PhysicalCustomerCte | LegalClientCte) {
    this.props.cteData = cteData;
  }
  public get recipient(): NaturalPerson | LegalPerson {
    return this.props.recipient;
  }
  public set recipient(recipient: NaturalPerson | LegalPerson) {
    this.props.recipient = recipient;
  }
  public get sender(): NaturalPerson | LegalPerson {
    return this.props.sender;
  }
  public set sender(sender: NaturalPerson | LegalPerson) {
    this.props.sender = sender;
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
