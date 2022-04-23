const express = require('express');
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');

const ServiceFactory = require('./helper/ServiceFactory');
const UserResolver = require('./resolvers/userResolver');

require('dotenv').config();

const SchemaLoader = require('./Helper/SchemaLoader');

const schemas = SchemaLoader();
const schema = buildSchema(schemas);
const port = process.env.PORT || 4000;

const root = {
    User: async function User(args, context, info){
        return await UserResolver.resolver(args, context, info);
    }
}

const context = {
    userServiceRoutes: ServiceFactory.getService('user', 'UserServiceRoutes', '0.0.0.0:50051' )
}



const app = express();

app.use('/graphql', expressGraphQL(async (request, response) => ({
    schema,
    rootValue: root,
    context: {...request, ...response, ...context},
    graphiql: true
}))
);
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);

