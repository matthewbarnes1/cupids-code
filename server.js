const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3000;

// Handlebars configuration
const hbs = exphbs.create({
    defaultLayout: 'home', // Use 'home' as the default layout
    layoutsDir: path.join(__dirname, 'Views/layouts'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'Views'));

// Static content
app.use(express.static(path.join(__dirname, './Public')));

// Routes
app.get('/', (req, res) => {
    res.render('layouts/home');
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

app.get('/user', (req, res) => {
    res.render('user');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

