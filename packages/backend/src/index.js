const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');
const authRoute = require('./middleware/authRoute');
const initPassport = require('./middleware/passport');
const middleWare = require('./middleware/index');


const server = createServer();

server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

// 3. Setting up and implementing passport strategies for Oauth 
// 🙏🙏🙏 This works!
server.express.use(initPassport());
server.express.use(middleWare);
server.express.use("/auth", authRoute);

// const options = {
//   // playground: null, // Dissable playground endpoint,
//   }
  
  // Setting our express responses so they'll hopefully free up some of the cors restrictions to allow our SPA to do auth properly
  server.express.get(server.options.endpoint + 'user', (req, res, done) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      message: 'Message from graphql-yoga (Express API)',
      obj: 'You can use graphql-yoga as a simple REST API'
    })
  })

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    console.log(`Server is now running on port http://localhost:${details.port}`);
  }
);
