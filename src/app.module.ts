import { join } from 'node:path';

import { ApolloDriver } from '@nestjs/apollo';
import { type ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { OwnDriverModule } from 'infra/graphql/entities/OwnDriverGraphql/OwnDriver.module';
import { UserModule } from 'infra/graphql/entities/UserGraphql/user.module';
import { VehicleBodyworkModule } from 'infra/graphql/entities/VehicleBodyworkGraphql/vehicle-bodywork.module';
import { VehicleBrandModule } from 'infra/graphql/entities/VehicleBrandGraphql/vehicle-brand.module';
import { VehicleModule } from 'infra/graphql/entities/VehicleGraphql/Vehicle.module';
import { VehicleTypeModule } from 'infra/graphql/entities/VehicleTypeGraphql/vehicle-type.module';
import { VehicleModelModule } from 'infra/graphql/entities/VeihicleModelGraphql/vehicle-model.module';
import { AuthModule } from 'infra/guard/auth.module';

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
    VehicleModelModule,
    VehicleModule,
    VehicleBodyworkModule,
    AuthModule,
    OwnDriverModule,
  ],
})
export class AppModule {}
