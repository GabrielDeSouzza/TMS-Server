import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type CepSearchProviderDTO } from 'domain/dto/providers/CepSearchProviderDto';
import { type CepSearchProvider } from 'domain/providers/CepSearchProvider';

@Injectable()
export class ViaCepService implements CepSearchProvider {
  async getZipCodeData(zipCode: string): Promise<CepSearchProviderDTO> {
    const request = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    if (!request.ok)
      throw new GraphQLError(`THIS CEP ${zipCode} IS INVALID`, {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const requestData: IRequestZipCode =
      (await request.json()) as IRequestZipCode;

    return {
      city: requestData.localidade,
      neighborhood: requestData.bairro,
      state: requestData.uf,
      street: requestData.logradouro,
      zipCode: requestData.cep,
      complement: requestData.cep,
    };
  }
}
interface IRequestZipCode {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
