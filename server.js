const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');

// Import models
const Car = require('./models/Car');
const User = require('./models/User');
//  GraphQL-Express Middlewre
//const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { graphqlExpress } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Generate Schema to Use
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Init express
const app = express();

// Cors setup
/* const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions)); */
app.use(cors('*'));

// Set up JWT authentication middleware for Browser Signin
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log(token);

  // Browser token validation
  if (token !== 'null') {
    try {
      // Try to verify the JWT token stored in Browser
      const currentUser = await jwt.verify(token, process.env.SECRET);
      // console.log(`token: ${typeof token} - env: ${typeof(process.env.SECRET)}`);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
      console.log(`${Math.random() * 10} server.js verify error`);
    }
  }
  next();
});

// Set up mongoose connection
var dev_db_url = 'mongodb://localhost:27017/car';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('open', () => console.info('Database connected!✨'));
db.on('error', console.error.bind(console, 'MongoDB connection error:😢'));

// GraphQL use Graphical UI
//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Connect schema to GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Car,
      User,
      currentUser
    }
  }))
);

// Deployment setup
if (process.env.NODE_ENV === 'production') {
  
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const port = process.env.PORT || 4444;

app.listen(port, () => `Server running on port ${port} 🔥`);