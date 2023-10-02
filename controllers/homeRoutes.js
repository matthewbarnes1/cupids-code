const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/matches', withAuth, async (req, res) =>{
    try{
      let sqlQuary = `SELECT profile.name, profile.hobbies, profile.age, profile.bio FROM profile `
      
      const [results, metadata] = await sequelize.query(sqlQuary);


      res.render('matches', {
        profiles: results,
        logged_in: req.session.logged_in
      });

      // res.json(results)

    }catch (err){

    }
})

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Project }],
    // });

    // const user = userData.get({ plain: true });  

    // SELECT profile.name, profile.hobbies, profile.age, profile.bio FROM profile INNER JOIN user ON user.id= profile.user_id WHERE USER.id=21
    let sqlQuary = `SELECT profile.name, profile.hobbies, profile.age, profile.bio FROM profile INNER JOIN user ON user.id= profile.user_id WHERE USER.id=${req.session.user_id}`
    
    const [results, metadata] = await sequelize.query(sqlQuary);
    
    console.log(results)

    if(results.length === 0){
      res.render('createProfile', {
        logged_in: req.session.logged_in
      });
    }else{
      res.render('editProfile', {
        profileInfo: results,
        logged_in: req.session.logged_in
      });
    }
    

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
