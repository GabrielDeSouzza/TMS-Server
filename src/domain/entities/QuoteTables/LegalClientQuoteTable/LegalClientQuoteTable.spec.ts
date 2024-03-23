import { LegalClientQuoteTable } from './LegalClientQuoteTable';

describe('User', () => {
  it('should create ciot for physical person', () => {
    const quote = new LegalClientQuoteTable({
      amount: 564,
      codQuote: 'aSdasd',
      created_by: 'sdsds',
      description: 'sdasdas',
      mass: 56.55,
      nf_value: 454.747,
      postalCodDestiny: '1234567',
      postalCodOrigin: '1234567',
      recipientId: '546.54.+654.6',
      senderId: '454654654',
      typeMerchandise: '155',
      updated_by: '45654654',
      volume: 54.45,
      who_pays: 'FOB',
    });

    expect(quote).toBeTruthy();
  });
});
