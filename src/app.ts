import express from "express";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());


// GET
app.get('/', (_req, res) => {
  res.send("Hello World!");
})

// POST

// PUT

// DELETE

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})


