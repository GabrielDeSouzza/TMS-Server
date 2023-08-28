import { type Route } from '../../../entities/routeEntities/Route/Route';
import { type InvoiceForLegalPerson } from '../invoiceForLegalPerson/InvoiceForLegalPerson';
import { type Merchandise } from '../merchandise/Merchandise';
import { CustomerOrderForLegalPerson } from './CustomerOrderForLegalPerson';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new CustomerOrderForLegalPerson({
      order: '65465d4as687d984asd987d9as7d9',
      InvoiceForLegalPerson: new Array<InvoiceForLegalPerson>(),
      Merchandase: new Array<Merchandise>(),
      Route: new Array<Route>(),
    });

    expect(customerOrder).toBeTruthy();
  });
});
