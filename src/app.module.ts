import { join } from 'node:path';

import { ApolloDriver } from '@nestjs/apollo';
import { type ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { CarrierCompanyModule } from 'infra/graphql/entities/CarrierCompanyGraphql/CarrierCompany.module';
import { CiotForLegalClientModule } from 'infra/graphql/entities/CiotForLegalClientGraphql/CiotForLegalClient.module';
import { CompanyVehicleModule } from 'infra/graphql/entities/CompanyVehicle/CompanyVehicle.module';
import { ContractOutsoucedDriverModule } from 'infra/graphql/entities/ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.module';
import { FreightExpenseModule } from 'infra/graphql/entities/FreightExpenseGraphql/FreightExpense.module';
import { CtePdfModule } from 'infra/graphql/entities/GenerateCtePdfGraphql/CtePdf.module';
import { IcmsModule } from 'infra/graphql/entities/IcmsGraphql/Icms.module';
import { IncidentModule } from 'infra/graphql/entities/IncidentGraphql/Incident.module';
import { LegalClientCteModule } from 'infra/graphql/entities/LegalClientCteGraphql/LegalClientCte.module';
import { LegalClientModule } from 'infra/graphql/entities/LegalClientGraphql/LegalClient.module';
import { LegalClientOrderModule } from 'infra/graphql/entities/LegalClientOrderGraphql/LegalClientOrder.module';
import { LegalClientQuoteTableModule } from 'infra/graphql/entities/LegalClientQuoteTableGraphql/LegalClientQuoteTable.module';
import { LegalContractModule } from 'infra/graphql/entities/LegalContractGraphql/LegalContract.module';
import { MaintenanceCompanyModule } from 'infra/graphql/entities/MaintenanceCompanyGraphql/MaintenanceCompany.module';
import { MaintenanceModule } from 'infra/graphql/entities/MaintenanceGraphql/Maintenance.module';
import { ManifestModule } from 'infra/graphql/entities/ManifestGraphql/Manifest.module';
import { OrderProcessingModule } from 'infra/graphql/entities/OrderProcessingGraphql/OrderProcessing.module';
import { OutsourcedDriverModule } from 'infra/graphql/entities/OutsourcedDriverGraphql/OutsourcedDriver.module';
import { OutsourcedTransportCompanyContractModule } from 'infra/graphql/entities/OutsourcedTransportCompanyContractGraphql/OutsourcedTransportCompanyContract.module';
import { OutsourcedTransportCompanyDriverModule } from 'infra/graphql/entities/OutsourcedTransportCompanyDriverGraphql/OutsourcedTransportCompanyDriver.module';
import { OutsourcedTransportCompanyModule } from 'infra/graphql/entities/OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.module';
import { OutsourcedTransportVehicleModule } from 'infra/graphql/entities/OutsourcedTransportVehicleGraphql/OutsourcedTransportVehicle.module';
import { OutsourcedVehicleModule } from 'infra/graphql/entities/OutsourcedVehicle/OutsourcedVehicle.module';
import { OwnDriverModule } from 'infra/graphql/entities/OwnDriverGraphql/OwnDriver.module';
import { PhysicalCustomerCteModule } from 'infra/graphql/entities/PhysicalCustomerCteGraphql/PhysicalCustomerCte.module';
import { PhysicalCustomerModule } from 'infra/graphql/entities/PhysicalCustomerGraphql/PhysicalCustomer.module';
import { PhysicalCustomerOrderModule } from 'infra/graphql/entities/PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.module';
import { PhysicalCustomerQuoteTableModule } from 'infra/graphql/entities/PhysicalCustomerQuoteTableGraphql/PhysicalCustomerQuoteTable.module';
import { RecipientModule } from 'infra/graphql/entities/RecipientGraphql/Recipient.module';
import { SenderModule } from 'infra/graphql/entities/SenderGraphql/Sender.module';
import { TypeOfMaintenanceModule } from 'infra/graphql/entities/TypeOfMaintenanceGraphql/TypeOfMaintenance.module';
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
      csrfPrevention: false,
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
    OutsourcedVehicleModule,
    CompanyVehicleModule,
    OutsourcedDriverModule,
    LegalClientModule,
    CarrierCompanyModule,
    LegalContractModule,
    LegalClientOrderModule,
    CiotForLegalClientModule,
    OutsourcedTransportCompanyModule,
    OutsourcedTransportCompanyContractModule,
    OutsourcedTransportVehicleModule,
    OutsourcedTransportCompanyDriverModule,
    ContractOutsoucedDriverModule,
    PhysicalCustomerModule,
    PhysicalCustomerOrderModule,
    OrderProcessingModule,
    IcmsModule,
    RecipientModule,
    SenderModule,
    LegalClientQuoteTableModule,
    PhysicalCustomerQuoteTableModule,
    PhysicalCustomerCteModule,
    LegalClientCteModule,
    FreightExpenseModule,
    CtePdfModule,
    TypeOfMaintenanceModule,
    MaintenanceCompanyModule,
    MaintenanceModule,
    IncidentModule,
    ManifestModule,
  ],
})
export class AppModule {}
