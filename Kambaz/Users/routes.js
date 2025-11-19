import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // ✅ Signup – creates new user if username not taken, else logs in existing
  const signup = (req, res) => {
    const existingUser = dao.findUserByUsername(req.body.username);

    if (existingUser) {
      // Instead of error, just log them in
      req.session["currentUser"] = existingUser;
      res.json(existingUser);
      return;
    }

    // Create a new user
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  // ✅ Signin
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  };

  // ✅ Profile
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // ✅ Update user and sync session
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  // ✅ Signout
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
}
