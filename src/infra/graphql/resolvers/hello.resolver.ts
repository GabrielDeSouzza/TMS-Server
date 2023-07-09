import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FooResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
