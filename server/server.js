import express from "express";
import {GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { graphqlHTTP } from "express-graphql";

const app = express();
const port = 3000;
const QueryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
        type: GraphQLString,
        resolve() {
            return 'Hello world';
        }
        }
    }
});

// const stravaConnectQuery = new GraphQLObjectType({
//     name: 'Strava',

// });

const schema = new GraphQLSchema({ query: QueryRoot });

app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});