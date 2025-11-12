export default function PathParameters(app) {
  // ✅ Addition route
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };

  // ✅ Subtraction route
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const diff = parseInt(a) - parseInt(b);
    res.send(diff.toString());
  };

  // ✅ Multiplication route (on your own)
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  };

  // ✅ Division route (on your own)
  const divide = (req, res) => {
    const { a, b } = req.params;
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  };

  // Define the endpoints
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
