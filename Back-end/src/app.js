
// libraries
const cors = require('cors')
const express = require('express')
const app = express()
require("dotenv").config()
const passport = require("passport");
require('../config/dbConnection')
 require("../passport");


// libraries

const mentorRouter = require('../Routes/mentorRouter')
const userRouter = require('../Routes/userRouter')
const opportunityRouter = require('../Routes/opportunityRouter');
const mailRouter = require("../Routes/mailRouter")
const menteeRouter = require("../Routes/menteeRouter");
const messageRouter = require("../Routes/messageRouter");
const commentRouter = require("../Routes/commentsRouter");
const requestRounter = require("../Routes/requestRouter")
const socialLoginRouter = require("../Routes/SocialAuthRouter");
const newsletterRouter = require('../Routes/newsletterRouter')
const passwordRouter = require('../Routes/passwordRouter')
const acceptingRouter = require('../Routes/acceptingRouter');
const { logger } = require('../middleware/reglogger')
const errorHandle = require('../middleware/errorLogger')
const corsOptions = require('../config/corsOptions')
const download = require('../Routes/downloadRouter')
const session = require("express-session");
const calendar = require("../Routes/calenderRouter");

const port = process.env.PORT || 5000


// useconst calendar = require("../Routes/calenderRouter");

// use


app.use(
  session({
    name: "session",
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // set cookie expiration time
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json())
app.use(cors(corsOptions))
app.use(logger)
app.use(errorHandle);
app.use('/api/v1', passwordRouter) 
app.use('/api/v1', newsletterRouter)
app.use('/api/auth', userRouter)
app.use('/api/v1', mentorRouter)
app.use('/api/auth', acceptingRouter)
app.use('/api/opp', opportunityRouter);
app.use('/api/req', requestRounter);
app.use('/api/email', mailRouter)
app.use('/api/v1', menteeRouter);
app.use('/api/v1', messageRouter);
app.use("/auth", socialLoginRouter);
app.use('/api/v1', commentRouter);
app.use("/uploads", express.static("uploads"));
app.use('/api/v1', download)
app.use(calendar);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(port, () => {
  console.log("The localhost is " + port)
})