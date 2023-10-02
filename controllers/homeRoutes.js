const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../Models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage', { 

  });

});


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
