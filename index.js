import express from "express";
import cors from "cors";
import Hello from "./Hello.js";
import db from "./Kambaz/Database/index.js";  // ✅ Your database
import UserRoutes from "./Kambaz/Users/routes.js";  // ✅ User routes
import Lab5 from "./Lab5/index.js";  // ✅ Lab5 routes

const app = express();

// ✅ Always enable these right after creating the app
app.use(cors());
app.use(express.json());
UserRoutes(app, db); 
Hello(app);
// ✅ Register all your routes
Lab5(app);         // 🧩 Lab5 routes first (for /lab5 endpoints)
// 👤 User routes next (for /api/users endpoints)

// ✅ Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
