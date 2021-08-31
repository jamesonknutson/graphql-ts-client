'graphql-ts-client' is a graphql client for TypeScript, it has two functionalities:

1. Supports GraphQL queries with strongly typed code.
2. **Automatically infers the type of the returned data according to the strongly typed query request**, This is the essential difference between this framework and other similar frameworks, and it is also the reason why I created it.
3. Because of point 2, unlike other client-side code generation tools and relay-compiler, **the code generation work is one-time**. Once the code is generated, it can be developed continuously until the server interface changes, without the need to generate code again and again.

![ImageText](graphql-ts-client.gif)


# Get started

## 1. [Step-by-step guide with nothing](get-start-async.md)
## 2. [Step-by-step guide with apollo](get-start-apollo.md)
## 3. [Step-by-step guide with relay](get-start-relay.md)

# MoreLinks

1. [Run the example](example/README.md)
2. [Code generator configuration](codegen-properties.md)
3. [Get inferred type explicitly](model-type.md)
4. [Polymorphism query & Fragment since 2.0.0](2.0.0.md)
5. [@apollo/client integration since 2.1.4](/example/client/apollo-demo/README.md)

# TODO items

1. Support directives
2. Integrate relay

# Contact me
babyfish.ct@gmail.com
