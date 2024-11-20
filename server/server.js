import  express  from "express";
// import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
// import { graphqlHTTP } from "express-graphql";
// import { request, gql } from 'graphql-request';
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./database/database.js";

const app = express();
app.use(cors());
const port = 4200;
const config = dotenv.config().parsed;
console.log(config);
const APP_ID = config.APP_ID;
const APP_SECRET = config.APP_SECRET;

// const QueryRoot = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         hello: {
//         type: GraphQLString,
//         resolve() {
//             return 'Hello world';
//         }
//         }
//     }
// });

const tokenExchangeStrava = async (code) => {
  const buildStravaTokenExchangeURL = (code) => {
    return `https://www.strava.com/api/v3/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`
  }
  const url = buildStravaTokenExchangeURL(code);
  const res = await axios.post(url);
  console.log(res);
  console.log(res.status);
  return res; // TODO: save user info in mongodb
}

// const schema = new GraphQLSchema({ query: QueryRoot });

// app.use('/graphql', graphqlHTTP(request => ({
//   schema: schema,
//   graphiql: true,
//   // context: { authUser: request.user }
// })));

app.post('/connect', (req, res) => {
  console.log('Received request');
  const user = tokenExchangeStrava(req.query.code); // TODO: let client fetch user info with GRAPHQL
  const data = {
    user: user,
  }
  res.json(data)
});

app.get('/', (req, res) => {
  console.log('test');

  connect();

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});