if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}


const express = require("express");
let app = express();

//Database operations
const mongoose = require("mongoose");

//For Error Handling
const ExpressError = require("./utils/ExpressError.js");

app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "/views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

//Cookies and session
const session = require("express-session");
const flash = require("connect-flash");
const {MongoStore} = require('connect-mongo');
//Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//==============================================================================
//=============================       ROUTES      ==============================
//==============================================================================
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
//==============================================================================
//==============================================================================
//==============================================================================


db_URL = process.env.ATLASDB_URL; 
app.use(express.static(path.join(__dirname, "/public")));
main()
  .then(() => {
    console.log("Connected to Wanderlust DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db_URL);
}


const store = MongoStore.create({
  mongoUrl:db_URL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",(error)=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
});
//Cookies and sessions
const sessionOptions = {
  store:store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized :true, 
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};



//Flash messages
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//==============================================================================
//=============================       ROUTES      ==============================
//==============================================================================

//==============================================================================
//==========================      LISTING ROUTES      ==========================
//==============================================================================
app.use("/listings",listingRouter);


//==============================================================================
//==========================      REVIEW ROUTES      ===========================
//==============================================================================

app.use("/listings/:id/reviews",reviewRouter);

//==============================================================================
//==========================      USER REGISTER ROUTE      =====================
//==============================================================================

app.use("/",userRouter);



// app.get("/registerUser",async (req,res)=>{
//   let fakeUser=new User({
//     email:"tej@gmail.com",
//     username:"Sigma---Student"
//   });
//   let newUser = await User.register(fakeUser,"hello world");
//   res.send(newUser);
// });


//Standard route for all
// app.all("*",(req,res,next)=>{
//   next(new ExpressError(404,"Page not found"));
// });
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Thing went wrong" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log(`Listening to the port: ${8080}`);
});
