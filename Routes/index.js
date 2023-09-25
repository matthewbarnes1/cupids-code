//* Main homepage route
const router = require('express').Router();

const userRoutes = require('./profile-routes');

router.use('/profile-routes', profileRoutes);

module.exports = router;
