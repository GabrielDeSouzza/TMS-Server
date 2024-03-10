import { Module } from '@nestjs/common';

import { UploaderProvider } from 'domain/providers/UploaderProvider';

import { CloudinaryUploaderProvider } from './cloudinary/providers/CloudinaryFileUploaderProvider';

@Module({
  providers: [
    {
      provide: UploaderProvider,
      useClass: CloudinaryUploaderProvider,
    },
  ],
  exports: [UploaderProvider],
})
export class ServicesModule {}
