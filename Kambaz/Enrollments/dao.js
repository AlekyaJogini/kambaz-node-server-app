import Database from "../Database/index.js";  // ← ADD THIS
import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao() {  // ← REMOVED db parameter
  
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;  // ← CHANGED: Get from Database
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }
  
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;  // ← CHANGED: Get from Database
    const index = enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );
    if (index !== -1) {
      enrollments.splice(index, 1);
      return true;
    }
    return false;
  }
  
  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}