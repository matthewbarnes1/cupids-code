const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('Public'));

// Handlebars configuration
const hbs = exphbs.create({
    defaultLayout: 'main',  // Using 'main' as the default layout
    layoutsDir: path.join(__dirname, 'views/layouts'),  // Specifying the directory for layouts
    partialsDir: path.join(__dirname, 'views/partials')  // In case you use partials, specify the directory
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: "Home" });
});

app.get('/login', (req, res) => {
    console.log('login');
    try {
        res.render('login', { title: "Login" });
    } catch (error) {
        console.error('Error rendering login view:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/logout', (req, res) => {
    res.render('logout', { title: "Logout" });
});

app.get('/profile-settings', (req, res) => {
    res.render('profile-settings', { title: "Profile Settings" });
});

app.get('/profile', (req, res) => {
    res.render('profile', { title: "Profile" });
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: "Signup" });
});

app.get('/user', (req, res) => {
    res.render('user', { title: "User" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
