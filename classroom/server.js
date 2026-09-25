const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require('connect-flash');

app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", users);
app.use("/posts", posts);

const sessionoptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionoptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success","you registered successfully");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//     if (req.session.count > 5) {
//       return res.redirect("/stopreq");
//     }
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/stopreq", (req, res) => {
//   res.send("Chill brother");
// });

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// });

app.listen(3000, () => {
  console.log("You are connected to the port 3000");
});
