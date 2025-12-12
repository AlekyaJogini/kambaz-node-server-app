import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();

  // Save a quiz attempt
  const saveAttempt = async (req, res) => {
    try {
      const attempt = req.body;
      const savedAttempt = await dao.saveAttempt(attempt);
      res.json(savedAttempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get all attempts for a student
  const getAttemptsByStudent = async (req, res) => {
    try {
      const { qid, sid } = req.params;
      const attempts = await dao.getAttemptsByStudent(qid, sid);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get the most recent attempt for a student
  const getLastAttempt = async (req, res) => {
    try {
      const { qid, sid } = req.params;
      const attempt = await dao.getLastAttempt(qid, sid);
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get attempt count for a student
  const getAttemptCount = async (req, res) => {
    try {
      const { qid, sid } = req.params;
      const count = await dao.getAttemptCount(qid, sid);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a specific attempt by ID
  const getAttemptById = async (req, res) => {
    try {
      const { aid } = req.params;
      const attempt = await dao.getAttemptById(aid);
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Route declarations
  app.post("/api/quizzes/:qid/attempts", saveAttempt);
  app.get("/api/quizzes/:qid/attempts/:sid", getAttemptsByStudent);
  app.get("/api/quizzes/:qid/attempts/:sid/last", getLastAttempt);
  app.get("/api/quizzes/:qid/attempts/:sid/count", getAttemptCount);
  app.get("/api/attempts/:aid", getAttemptById);
}