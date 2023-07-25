import { type Route } from '../../../entities/routeEntities/Route/Route';
import { type InvoiceForPhysicalCustomer } from '../invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';
import { type Merchandise } from '../merchandise/Merchandise';
import { CustomerOrderForPhysicalCustomer } from './CustomerOrderForPhysicalCustomer';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new CustomerOrderForPhysicalCustomer({
      order: '65465d4as687d984asd987d9as7d9',
      InvoiceForPhysicalCustomer: new Array<InvoiceForPhysicalCustomer>(),
      Merchandase: new Array<Merchandise>(),
      Route: new Array<Route>(),
    });

    expect(customerOrder).toBeTruthy();
  });
});
