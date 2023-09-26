const express = require('express');
const path = require('path');
const { sequelize } = require('./Models');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// Set views to layouts directory since you want to directly render 'home.handlebars'
app.set('views', path.join(__dirname, './Views/layouts'));

const hbs = exphbs.create({
    defaultLayout: 'home',
    layoutsDir: path.join(__dirname, 'Views/layouts'),
    partialsDir: path.join(__dirname, 'Views')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login', { layout: 'home' });
});

app.get('/logout', (req, res) => {
    res.render('logout', { layout: 'home' });
});

app.get('/profile-settings', (req, res) => {
    res.render('profile-settings', { layout: 'home' });
});

app.get('/profile', (req, res) => {
    res.render('profile', { layout: 'home' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { layout: 'home' });
});

app.get('/user', (req, res) => {
    res.render('user', { layout: 'home' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
