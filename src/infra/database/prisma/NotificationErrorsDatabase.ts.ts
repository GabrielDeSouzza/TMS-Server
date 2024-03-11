import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { GraphQLError } from 'graphql';

export class NotificationErrorsDatabase {
  public HandleErrors(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2000': {
          this.thowError(`INVALID LENGTH FOR FIELD`);
          break;
        }

        case 'P2001': {
          throw this.thowError('NOT FOUND ');
        }

        case 'P2002': {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { target }: any = error.meta;
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
          this.thowError(`${String(target[0]).toUpperCase()} ALREADY EXISTS`);
          break;
        }

        case 'P2025': {
          throw this.thowError(error.message);
        }
      }

      console.log(error);
    }
  }
  private thowError(message: string) {
    throw new GraphQLError(message);
  }
}
