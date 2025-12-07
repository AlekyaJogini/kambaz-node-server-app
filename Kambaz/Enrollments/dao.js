import Database from "../Database/index.js";
import model from "./model.js";  // ✅ ADD THIS IMPORT
import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao() {
  
  // ✅ ADD THESE TWO NEW FUNCTIONS:
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }
  
  function enrollUserInCourse(userId, courseId) {
    return model.create({  // ✅ CHANGED: Use model.create instead of array push
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  
  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });  // ✅ CHANGED: Use model.deleteOne
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }
  
  return {
    findCoursesForUser,      // ✅ ADD TO RETURN
    findUsersForCourse,      // ✅ ADD TO RETURN
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}