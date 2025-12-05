import Database from "../Database/index.js";  // ← ADD THIS
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {  // ← REMOVED db parameter
  
  function findAllCourses() {
    return Database.courses;  // ← CHANGED: db.courses to Database.courses
  }
  
  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;  // ← CHANGED: db to Database
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }
  
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    Database.courses = [...Database.courses, newCourse];  // ← CHANGED: db to Database
    return newCourse;
  }
  
  function deleteCourse(courseId) {
    const { courses, enrollments } = Database;  // ← CHANGED: db to Database
    Database.courses = courses.filter((course) => course._id !== courseId);  // ← CHANGED
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
  }
  
  // ✅ ADD: Update course
  function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;  // ← CHANGED: db to Database
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }
  
  return { 
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse
  };
}