import { Module } from '@nestjs/common';

import { CepSearchProvider } from 'domain/providers/CepSearchProvider';
import { UploaderProvider } from 'domain/providers/UploaderProvider';

import { CloudinaryUploaderProvider } from './cloudinary/providers/CloudinaryFileUploaderProvider';
import { ViaCepService } from './viaCep/provider/ViaCepService';

@Module({
  providers: [
    {
      provide: UploaderProvider,
      useClass: CloudinaryUploaderProvider,
    },
    { provide: CepSearchProvider, useClass: ViaCepService },
  ],
  exports: [UploaderProvider, CepSearchProvider],
})
export class ServicesModule {}
