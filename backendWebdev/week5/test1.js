import express from "express";
const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

app.get("/", (req, res) => {
  res.send("hi");
});

// Middleware function
function logRequest(req, res, next) {
  console.log(`Request made to: ${req.url}`);
  next();
}

// Apply middleware to a specific route
app.get("/special", logRequest, (req, res) => {
  res.send("This route uses route-specific middleware!");
});

app.get("/sum", function (req, res) {
  console.log(req.name);
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a + b,
  });
});
