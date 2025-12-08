import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  
  // Find all quizzes for a course
  async function findQuizzesForCourse(courseId) {
    const quizzes = await model.find({ course: courseId });
    return quizzes;
  }
  
  // Find a single quiz by ID
  async function findQuizById(quizId) {
    return await model.findById(quizId);
  }
  
  // Create a new quiz
  function createQuiz(quiz) {
    const newQuiz = { 
      ...quiz, 
      _id: uuidv4(),
      questions: []  // Start with empty questions
    };
    return model.create(newQuiz);
  }
  
  // Update a quiz
  function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }
  
  // Delete a quiz
  function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }
  
  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
}