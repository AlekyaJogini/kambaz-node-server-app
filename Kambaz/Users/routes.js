import UsersDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import CoursesDao from "../Courses/dao.js";

// let currentUser = null;

export default function UserRoutes(app) {  // ← REMOVED db parameter
  const dao = UsersDao();  // ← REMOVED db argument
  const enrollmentsDao = EnrollmentsDao();  // ← REMOVED db argument
  const coursesDao = CoursesDao();  // ← REMOVED db argument
  
  const createUser = async (req, res) => { 
     const user = await dao.createUser(req.body);
  res.json(user);
  };  // ← ADDED async
  
  const deleteUser = async (req, res) => { 
     const status = await dao.deleteUser(req.params.userId);
  res.json(status);
  };  // ← ADDED async
  
  const findAllUsers = async (req, res) => { 
     const { role, name } = req.query;
  
  if (role) {
    const users = await dao.findUsersByRole(role);
    res.json(users);
    return;
  }
  
  if (name) {
    const users = await dao.findUsersByPartialName(name);
    res.json(users);
    return;
  }
  
  const users = await dao.findAllUsers();
  res.json(users);
};  // ← ADDED async
  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
  res.json(user);
   };  // ← ADDED async
  
 const updateUser = async (req, res) => {
  const { userId } = req.params;
  const userUpdates = req.body;
  await dao.updateUser(userId, userUpdates);
  const currentUser = req.session["currentUser"];
  if (currentUser && currentUser._id === userId) {
    req.session["currentUser"] = { ...currentUser, ...userUpdates };
  }
  res.json(currentUser);
};

app.put("/api/users/:userId", updateUser);
  
  const signup = async (req, res) => {  // ← ADDED async
    const user = await dao.findUserByUsername(req.body.username);  // ← ADDED await
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);  // ← ADDED await
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  const signin = async (req, res) => {  // ← ADDED async
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);  // ← ADDED await
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  
  const signout = async (req, res) => {  // ← ADDED async
    req.session.destroy();
    res.sendStatus(200);
  };
  
  const profile = async (req, res) => {  // ← ADDED async
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  
  const findCoursesForEnrolledUser = async (req, res) => {  // ← ADDED async
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await coursesDao.findCoursesForEnrolledUser(userId);  // ← ADDED await
    res.json(courses);
  };
  
  const enrollUserInCourse = async (req, res) => {  // ← ADDED async
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);  // ← ADDED await
    res.json(enrollment);
  };
  
  const unenrollUserFromCourse = async (req, res) => {  // ← ADDED async
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    await enrollmentsDao.unenrollUserFromCourse(userId, courseId);  // ← ADDED await
    res.sendStatus(200);
  };
  
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}