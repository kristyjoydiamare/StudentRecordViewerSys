const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let students = [
  { id: 1, name: "Juan Dela Cruz", course: "BSIT", year: 2 },
  { id: 2, name: "Maria Santos", course: "BSCS", year: 3 },
  { id: 3, name: "Pedro Reyes", course: "BSIT", year: 1 },
  { id: 4, name: "Ana Lopez", course: "BSIS", year: 4 }
];

// GET ALL
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// SEARCH
app.get("/students/search", (req, res) => {
  const name = (req.query.name || "").toLowerCase();
  const result = students.filter(s =>
    s.name.toLowerCase().includes(name)
  );
  res.status(200).json(result);
});

// FILTER BY COURSE
app.get("/students/course/:course", (req, res) => {
  const result = students.filter(s => s.course === req.params.course);
  res.status(200).json(result);
});

// GET ONE
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.status(200).json(student);
});

// ADD
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newStudent = {
    id: Date.now(),
    name,
    course,
    year
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// UPDATE (EDIT)
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Not found" });
  }

  Object.assign(student, req.body);
  res.status(200).json(student);
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});