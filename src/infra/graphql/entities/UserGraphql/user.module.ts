import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { GraphqlCenterModule } from '../GraphqlCenter.module';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver],
  imports: [GraphqlCenterModule],
})
export class UserModule {}
