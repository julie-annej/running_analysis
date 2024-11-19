import  express  from "express";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { request, gql } from 'graphql-request';
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 4200;
const config = dotenv.config().parsed;
console.log(config);
const APP_ID = config.APP_ID;
const APP_SECRET = config.APP_SECRET;

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

// const stravaAuthorizationURL = `https://www.strava.com/api/v3/oauth/authorize?client_id=${APP_ID}&redirect_uri=http://localhost:3000/&response_type=code&approval_prompt=force&scope=activity:read_all&state=test`
// const tokenExchangeStrava = async (code) => {
//   const buildStravaTokenExchangeURL = (code) => {
//     return `https://www.strava.com/api/v3/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`
//   }
//   const url = buildStravaTokenExchangeURL(code);
//   const res = await axios.post(url);
  
//   console.log(res);
//   console.log(res.status);
// }

const schema = new GraphQLSchema({ query: QueryRoot });

app.use('/api', graphqlHTTP(request => ({
  schema: schema,
  graphiql: true,
  // context: { authUser: request.user }
})));

app.get('/', (req, res) => {
  console.log('test');
  if (req.query.code == null) {
    // res.redirect(301, stravaAuthorizationURL);
    return;
  }

  // if (req.query.code != null) {
  //   if (req.query.error) {
  //     console.log('error')
  //   }
  //   console.log('authorized')
  //   const code = req.query.code;
  //   console.log("code", code);
  //   tokenExchangeStrava(code);
  //   res.redirect(301, '/home');
  // };
});

app.get('/home', (req, res) => {
  res.send('Authorized');

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});