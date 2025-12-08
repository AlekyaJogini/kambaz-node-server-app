import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();
  
  // Get all quizzes for a course
  const findQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  };
  
  // Get a single quiz by ID
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  };
  
  // Create a new quiz for a course
  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    const quiz = {
      ...req.body,
      course: cid,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  };
  
  // Update a quiz
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(qid, quizUpdates);
    res.send(status);
  };
  
  // Delete a quiz
  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.send(status);
  };
  
  // Route declarations
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:qid", findQuizById);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
}