const express = require('express');
const path = require('path');
const { sequelize } = require('./Models');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));


sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error:', error);
  });


  app.get('/home', (req, res) => {
    res.render('main');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/logout', (req, res) => {
    res.render('logout');
  });

  app.get('/profile-settings', (req, res) => {
    res.render('profile-settings');
  });

  app.get('/profile', (req, res) => {
    res.render('profile');
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});