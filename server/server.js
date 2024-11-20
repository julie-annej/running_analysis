import  express  from "express";
// import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
// import { graphqlHTTP } from "express-graphql";
// import { request, gql } from 'graphql-request';
import axios from "axios";
import { config } from "dotenv";
import cors from "cors";
import { createUser } from "./database/database.js";

const app = express();
app.use(cors());
const port = 4200;
const configurations = config().parsed;
console.log(configurations);
const APP_ID = configurations.APP_ID;
const APP_SECRET = configurations.APP_SECRET;

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
  return res; 
}
// TODO: let client fetch user info with GRAPHQL
// const schema = new GraphQLSchema({ query: QueryRoot });

// app.use('/graphql', graphqlHTTP(request => ({
//   schema: schema,
//   graphiql: true,
//   // context: { authUser: request.user }
// })));

app.post('/connect', async (req, res) => {
  console.log('Received request');
  const result = await tokenExchangeStrava(req.query.code); 
  if (result.status === 200) {
    const user = result.data;
    createUser(user); // TODO: save user info in mongodb
    res.status(200).send({message:'User connected'});
    return;
  } 
  res.status(400).json({message:'Error connecting user'});
});

app.get('/', (req, res) => {
  console.log('test');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});