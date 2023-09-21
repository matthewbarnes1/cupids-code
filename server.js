const express = require('express');
// const exphbs  = require('express-handlebars');
const { sequelize } = require('./Models');

const app = express();
const PORT = process.env.PORT || 3001;

// app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error:', error);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});