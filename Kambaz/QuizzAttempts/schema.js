import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  questionId: String,
  questionType: String, // MULTIPLE_CHOICE, TRUE_FALSE, FILL_IN_BLANK
  selectedAnswer: mongoose.Schema.Types.Mixed, // String, Boolean, or Array
  correctAnswer: mongoose.Schema.Types.Mixed,
  isCorrect: Boolean,
  pointsEarned: Number,
});

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    studentId: String, // User taking the quiz
    quizId: String, // Quiz being taken
    courseId: String, // Course ID
    answers: [answerSchema], // Array of answers to each question
    score: Number, // Points earned
    totalPoints: Number, // Total possible points
    attemptNumber: Number, // 1st attempt, 2nd attempt, etc.
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
