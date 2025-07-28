const express = require('express');
const cors = require('cors');
const app = express();
const todos = [];
let idCounter = 1;

app.use(cors());
app.use(express.json());

const USERS = [{ username: 'admin', password: '1234' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const valid = USERS.find(u => u.username === username && u.password === password);
  if (valid) return res.status(200).json({ message: 'Login successful' });
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/items', (req, res) => res.json(todos));

app.post('/items', (req, res) => {
  const { text } = req.body;
  const newItem = { id: idCounter++, text };
  todos.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = todos.find(t => t.id == req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.text = req.body.text;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(4000, () => console.log('API running on http://localhost:4000'));
