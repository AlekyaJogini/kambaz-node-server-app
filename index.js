import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";



import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import db from "./Kambaz/Database/index.js";
import cors from "cors";

import "dotenv/config";
import session from "express-session";



const CONNECTION_STRING =  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    
    
  })
);



const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,

};
 


if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    
  };
    
  
}

app.use(session(sessionOptions));
app.use(express.json());
const port = process.env.PORT || 4000;


// ✅ Add routes AFTER session setup
UserRoutes(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentRoutes(app, db);
Hello(app);
Lab5(app);


app.listen(port, () => console.log(`Server running on port ${port}`));