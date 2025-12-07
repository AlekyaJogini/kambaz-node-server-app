import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {  // ✅ REMOVED db parameter
  const dao = CoursesDao();  // ✅ REMOVED db argument
  const enrollmentsDao = EnrollmentsDao();  // ✅ REMOVED db argument
  
  // ✅ Group callback functions at the top
  const findAllCourses = async (req, res) => {  // ✅ ADDED async
    const courses = await dao.findAllCourses();  // ✅ ADDED await
    res.send(courses);
  };
  
  const findCoursesForEnrolledUser = async (req, res) => {  // ✅ ADDED async
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await dao.findCoursesForEnrolledUser(userId);  // ✅ ADDED await
    res.json(courses);
  };
  
  const createCourse = async (req, res) => {  // ✅ ADDED async
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await dao.createCourse(req.body);  // ✅ ADDED await
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);  // ✅ ADDED await
    res.json(newCourse);
  };
  
  const deleteCourse = async (req, res) => {  // ✅ ADDED async
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);  // ✅ ADDED await
    res.send(status);
  };
  
  const updateCourse = async (req, res) => {  // ✅ ADDED async
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const updatedCourse = await dao.updateCourse(courseId, courseUpdates);  // ✅ ADDED await
    res.json(updatedCourse);
  };

   const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  }

  
  // ✅ Group route declarations at the bottom
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);


  app.get("/api/courses/:cid/users", findUsersForCourse);

}