import { LegalClientMerchandise } from './LegalClientClientMerchandise';

describe('Merchandise', () => {
  it('should create merchandise', () => {
    const merchandise = new LegalClientMerchandise({
      amount: 5,
      codMerchandise: '564657',
      description: 'Arroz',
      mass: 458_787,
      invoice_legal_client: '654654',
      legal_client_order_id: '54598',
      value: 646_787,
      volume: 564_654,
      id: '123',
    });

    expect(merchandise).toBeTruthy();
  });
});
