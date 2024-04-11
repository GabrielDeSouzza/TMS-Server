import { Incident } from './Incident';

describe('Incident', () => {
  it('should create order processing', () => {
    const customerOrder = new Incident({
      created_by: '646479',
      date_incident: new Date(),
      description: '54546',
      order_process_id: '54646574987',
      updated_by: '6796878',
      date_resolved: new Date(),
    });
    expect(customerOrder).toBeTruthy();
  });
});
