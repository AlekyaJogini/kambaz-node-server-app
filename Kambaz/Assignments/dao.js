import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  
  // Find all assignments for a course
  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  }
  
  // Create new assignment
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  
  // Delete assignment
  function deleteAssignment(assignmentId) {
    const { assignments } = db;
    db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  }
  
  // Update assignment
  function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = db;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  
  // Find assignment by ID
  function findAssignmentById(assignmentId) {
    const { assignments } = db;
    return assignments.find((assignment) => assignment._id === assignmentId);
  }
  
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}