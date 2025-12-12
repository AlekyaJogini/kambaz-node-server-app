import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptsDao() {
  // Save a quiz attempt
  async function saveAttempt(attempt) {
    const newAttempt = {
      ...attempt,
      _id: uuidv4(),
    };
    return model.create(newAttempt);
  }

  // Get all attempts for a student in a quiz
  async function getAttemptsByStudent(quizId, studentId) {
    return await model.find({ quizId, studentId }).sort({ submittedAt: -1 });
  }

  // Get the most recent attempt for a student
  async function getLastAttempt(quizId, studentId) {
    return await model.findOne({ quizId, studentId }).sort({ submittedAt: -1 });
  }

  // Get attempt count for a student
  async function getAttemptCount(quizId, studentId) {
    return await model.countDocuments({ quizId, studentId });
  }

  // Get a specific attempt by ID
  async function getAttemptById(attemptId) {
    return await model.findById(attemptId);
  }

  // Delete all attempts for a quiz (when quiz is deleted)
  async function deleteAttemptsByQuiz(quizId) {
    return await model.deleteMany({ quizId });
  }

  return {
    saveAttempt,
    getAttemptsByStudent,
    getLastAttempt,
    getAttemptCount,
    getAttemptById,
    deleteAttemptsByQuiz,
  };
}