import  express  from "express";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { request, gql } from 'graphql-request';
import axios from "axios";
import open, { apps} from "open";
import dotenv from "dotenv";

const app = express();
const config = dotenv.config();
const port = 3000;
const APP_ID = '140227';
const APP_SECRET = '3cf28e32cd27df93c3052f4457d1ebb305a429e8';

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

// const authHeaders = {
//   token: "b178b7291cf3d1b3fd40db335884a2ac",
// }
const stravaAuthorizationURL = `https://www.strava.com/api/v3/oauth/authorize?client_id=${APP_ID}&redirect_uri=http://localhost:3000/&response_type=code&approval_prompt=force&scope=activity:read_all&state=test`
const tokenExchangeStrava = async (code) => {
  const buildStravaTokenExchangeURL = (code) => {
    return `https://www.strava.com/api/v3/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`
  }
  const url = buildStravaTokenExchangeURL(code);
  const res = await axios.post(url);
  console.log(res);
  console.log(res.status);
}

const schema = new GraphQLSchema({ query: QueryRoot });

app.use('/api', graphqlHTTP(request => ({
  schema: schema,
  graphiql: true,
  // context: { authUser: request.user }
})));

app.get('/', (req, res) => {
  res.send('Welcome to my server!!!');
  if (req.query.code == null) {
    open(stravaAuthorizationURL, {wait: true, app: {name: apps.chrome}});
  }

  if (req.query.code != null) {
    if (req.query.error) {
      console.log('error')
    }
    console.log('authorized')
    const code = req.query.code;
    console.log("code", code);
    tokenExchangeStrava(code);
  };

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});