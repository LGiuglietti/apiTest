const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'laucha',
    password: '1234',  
    database: 'apiTest',
    port: 1200
}); 

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

// Get all users
app.get('/user', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Get a user by ID
  app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });
  
  // Create a new user
  app.post('/user', (req, res) => {
    const { name, mail, pass } = req.body;
    db.query('INSERT INTO user (name, mail,pass) VALUES (?, ?, ?)', [name, email,pass], (err, result) => {
      if (err) throw err;
      res.json({ message: 'User added successfully', id: result.insertId });
    });
  });
  
  // Update a user
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
      if (err) throw err;
      res.json({ message: 'User updated successfully' });
    });
  });
  
  // Delete a user
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
      if (err) throw err;
      res.json({ message: 'User deleted successfully' });
    });
  });