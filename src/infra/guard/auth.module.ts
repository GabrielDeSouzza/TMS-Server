import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { DatabaseModule } from 'infra/database/database.module';

import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2d' },
      }),
    }),
    DatabaseModule,
  ],
  providers: [AuthResolver, JwtStrategy, JwtService],
})
export class AuthModule {}
