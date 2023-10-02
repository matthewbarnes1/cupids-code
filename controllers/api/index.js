const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
