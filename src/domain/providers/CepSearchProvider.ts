import { type CepSearchProviderDTO } from 'domain/dto/providers/CepSearchProviderDto';

export abstract class CepSearchProvider {
  abstract getZipCodeData(zipCode: string): Promise<CepSearchProviderDTO>;
}
