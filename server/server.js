import  express  from "express";
// import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
// import { graphqlHTTP } from "express-graphql";
// import { request, gql } from 'graphql-request';
// import axios from "axios";
// import { config } from "dotenv";
import cors from "cors";
import { createUser, getAuth, updateAuth } from "./database/database.js";
import { codeExchangeStrava } from "./auth/authentication.js";

const app = express();
app.use(cors());
const port = 4200;


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


// TODO: let client fetch user info with GRAPHQL
// const schema = new GraphQLSchema({ query: QueryRoot });

// app.use('/graphql', graphqlHTTP(request => ({
//   schema: schema,
//   graphiql: true,
//   // context: { authUser: request.user }
// })));

app.post('/connect', async (req, res) => {
  console.log('Received request');
  const result = await codeExchangeStrava(req.query.code); 
  if (result.status !== 200) {
    res.status(400).json({message:'Error connecting user'});
  }
    const account = result.data;
    createUser(account.athlete);
    const authInfo = {
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      expires_at: account.expires_at,
      athlete_id: account.athlete.id
    }
    await updateAuth(authInfo)
    
    res.status(200).send({message:'User connected'});
    return;
  });
  
  app.get('/', async (req, res) => {
    console.log('test');
    const info = await getAuth(74899019);
    console.log(info);
    res.status(200).send(info);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});