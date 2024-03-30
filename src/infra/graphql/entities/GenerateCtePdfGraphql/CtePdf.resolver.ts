import { Args, Resolver, Query } from '@nestjs/graphql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ctePdfUseCase } from 'app/useCases/CtePdf/CtePdfUseCase';

import {
  CtePdfLegalClientInput,
  CtePdfPhysicalCustomerInput,
} from './CtePdf.input';
import { CtePDfModel } from './CtePdf.model';

@Resolver(() => CtePDfModel)
export class CtePdfResolver {
  constructor(private ctePdfUseCase: ctePdfUseCase) {}
  @Query(() => CtePDfModel)
  async generateLegalClientCte(
    @Args('request') request: CtePdfLegalClientInput,
  ) {
    const cteUrl = await this.ctePdfUseCase.getCteUrlLegalClient(
      request.legalClientOrderId,
    );

    return { cteUrl };
  }
  @Query(() => CtePDfModel)
  async generatePhysicalCustomerCte(
    @Args('request') request: CtePdfPhysicalCustomerInput,
  ) {
    const cteUrl = await this.ctePdfUseCase.getCteUrlPhysicalCustomer(
      request.physicalCustomerOrderId,
    );

    return { cteUrl };
  }
}
