import { LegalClientMerchandise } from './LegalClientClientMerchandise';

describe('Merchandise', () => {
  it('should create merchandise', () => {
    const merchandise = new LegalClientMerchandise({
      amount: 5,
      codMerchandise: '564657',
      description: 'Arroz',
      mass: 458_787,
      legalClientOrderId: '5687',
      value: 646_787,
      volume: 564_654,
      id: '123',
    });

    expect(merchandise).toBeTruthy();
  });
});
