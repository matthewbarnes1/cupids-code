//* Main homepage route
const router = require('express').Router();

const userRoutes = require('./profile-routes');

router.use('/users', profileRoutes);

module.exports = router;
