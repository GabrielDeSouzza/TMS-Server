import { join } from 'node:path';

import { type ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { UserModule } from 'infra/graphql/UserGraphql/user.module';
import { VehicleBrandModule } from 'infra/graphql/VehicleBrandGraphql/vehicle-brand.module';
import { VehicleTypeModule } from 'infra/graphql/VehicleType/vehicle-type.module';

@Module({
  imports: [
    CacheModule.register(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      autoSchemaFile: join(
        process.cwd(),
        'src/infra/graphql/generated/schema.gql',
      ),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    UserModule,
    VehicleBrandModule,
    VehicleTypeModule,
  ],
})
export class AppModule {}
