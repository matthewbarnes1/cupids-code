//* Main homepage route
const express = require('express');
const app = express();
const port = 3306;

// Define a route for the main homepage
app.get('/', (req, res) => {
  // Your logic for rendering the main homepage here
  res.send('<h1>Welcome to the Main Homepage</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
