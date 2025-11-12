
const moduleObj = {
  id: "CS5610",
  name: "Web Development",
  description: "Full Stack Development using React and Node.js",
  course: "CS5610",
};
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

export default function WorkingWithObjects(app) {
  // Route to send the whole assignment object
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  //  New route to send just the title
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };

  const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
 };


  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);


  app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json(moduleObj.name);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    moduleObj.description = newDescription;
    res.json(moduleObj);
  });

  // --- Update assignment score and completed status ---
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
  });
}


