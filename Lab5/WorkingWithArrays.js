// Lab5/WorkingWithArrays.js
let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  // ✅ Get all todos or filter by completed status
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  // ✅ Get a todo by ID
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
      return;
    }
    res.json(todo);
  };

  // ✅ Create a new todo (GET version for older steps)
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  // ✅ Delete todo with error handling (used by DELETE route)
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

    if (todoIndex === -1) {
      // 🚨 If todo doesn't exist, send a 404 error
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todoIndex, 1);
    res.sendStatus(200); // ✅ success but no data needed
  };

  // ✅ Remove todo (old GET version for earlier labs)
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

    if (todoIndex === -1) {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
      return;
    }

    todos.splice(todoIndex, 1);
    res.json(todos);
  };

  // ✅ Update a todo's title (legacy GET route)
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
  };

  // ✅ Update "completed" property (legacy GET route)
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.json(todos);
    } else {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
  };

  // ✅ Update description (legacy GET route)
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todos);
    } else {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
  };

  // ✅ POST new todo (with body)
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo); // ✅ return the new todo only
  };

  // ✅ PUT route to update an existing todo with error handling
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

    if (todoIndex === -1) {
      // 🚨 If not found, return 404 + error message
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });

    res.sendStatus(200); // ✅ OK (no need to send all todos back)
  };

  // ✅ ROUTES
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/:id/delete", removeTodo); // old GET delete route
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);

  // ✅ Modern routes using proper HTTP verbs
  app.post("/lab5/todos", postNewTodo);
  app.put("/lab5/todos/:id", updateTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
}
