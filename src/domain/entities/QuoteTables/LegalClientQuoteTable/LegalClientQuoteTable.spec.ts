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
      adressDestiny: {
        address_number: '32+65',
        city: '54654',
        neighborhood: '546546',
        postalCod: '1548787',
        street: '646546',
        uf: 'pf',
        complement: '54654654',
      },
      adressOrigin: {
        address_number: '32+65',
        city: '54654',
        neighborhood: '546546',
        postalCod: '1548787',
        street: '646546',
        uf: 'pf',
        complement: '54654654',
      },
      formPayment: 'Pix',
      kindService: 'sadasd',
      recipientId: '546.54.+654.6',
      senderId: '454654654',
      typeMerchandise: '155',
      updated_by: '45654654',
      volume: 54.45,
      who_pays: 'FOB',
      digital_signature: '4654654',
      nf_number: '65+65+65',
      nf_serie: '464646',
    });

    expect(quote).toBeTruthy();
  });
});
