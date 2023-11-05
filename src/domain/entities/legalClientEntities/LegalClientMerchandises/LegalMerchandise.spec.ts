import { LegalClientMerchandise } from './LegalClientClientMerchandise';

describe('Merchandise', () => {
  it('should create merchandise', () => {
    const merchandise = new LegalClientMerchandise({
      amount: 5,
      codMerchandise: '564657',
      created_by: '123',
      description: 'Arroz',
      mass: 458_787,
      legalClientOrderId: '5687',
      updated_by: '546',
      value: 646_787,
      volume: 564_654,
      created_at: new Date(),
      id: '123',
      updated_at: new Date(),
    });

    expect(merchandise).toBeTruthy();
  });
});
