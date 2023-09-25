const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3306;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));

// Configure cookie session
app.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'], // Replace it with the keys we have
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day in milliseconds)
  })
);


// Routes
app.get('/', (req, res) => {
  // Check if the user is authenticated by checking the session data
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}! <a href="/logout">Logout</a>`);
  } else {
    res.send('Welcome! <a href="/login">Login</a>');
  }
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user (you would typically check against a database)
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Store user data in the session
    req.session.user = { id: user.id, username: user.username };

    res.redirect('/');
  } else {
    res.send('Authentication failed. <a href="/login">Try again</a>');
  }
});

app.get('/logout', (req, res) => {
  // Clear the session data to log out the user
  req.session = null;
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

