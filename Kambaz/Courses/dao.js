import Database from "../Database/index.js";
import model from "./model.js";  // ✅ ADD THIS
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {
  
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });  // ✅ ONLY CHANGE THIS
  }
  
  async function findCoursesForEnrolledUser(userId) {  // ✅ ADD async
    const { enrollments } = Database;  // ✅ CHANGE: Only get enrollments
    const courses = await model.find({}, { name: 1, description: 1 });  // ✅ CHANGE: Get courses from DB with await
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }
  
  // ⚠️ KEEP THESE UNCHANGED (for now):
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
     return model.create(newCourse);
  }
  
 function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId }); 
}
  
 function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });  // ✅ Use model
}
  
  return { 
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse
  };
}