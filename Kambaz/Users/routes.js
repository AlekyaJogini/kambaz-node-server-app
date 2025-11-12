import UsersDao from "./dao.js";

let currentUser = null;

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // ✅ Create a new user
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };

  // ✅ Delete user
  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };

  // ✅ Get all users
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  // ✅ Get user by ID
  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    res.json(user);
  };

  // ✅ Update user
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    dao.updateUser(userId, user);
    res.sendStatus(200);
  };

  // ✅ Signup
  const signup = (req, res) => {
     const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    currentUser = dao.createUser(req.body);
    res.json(currentUser);
    };

  // ✅ Signin (Login)
  const signin = (req, res) => {
    const { username, password } = req.body;
    currentUser = dao.findUserByCredentials(username, password);
    
    res.json(currentUser);
  };

  // ✅ Signout
  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };

  // ✅ Profile (return current logged-in user)
  const profile = (req, res) => {
    if (!currentUser) return res.sendStatus(401);
    res.json(currentUser);
  };

  // ✅ Register all routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
