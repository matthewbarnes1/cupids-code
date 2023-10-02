const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Profile } = require('../../Models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  
  try {
    
    console.log(req.body)
    console.log('profile is being accessed')
    
    const newProfile = await Profile.create({name: req.body.firstname, 
      bio:req.body.bio,
      age:req.body.age,
      hobbies:req.body.hobbies,
      user_id: req.session.user_id,})

  
    
      res.status(200).json({newProfile});
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }

});

router.post('/update', withAuth, async (req, res) => {
  
  try {
    
    console.log(req.body)
    console.log('update is being done')

    let sqlQuary = `UPDATE profile INNER JOIN user ON user.id = profile.user_id SET profile.name='${req.body.firstname}', profile.bio='${req.body.bio}', profile.age=${req.body.age}, profile.hobbies='${req.body.hobbies}' WHERE USER.id=${req.session.user_id}`
    
    const [results, metadata] = await sequelize.query(sqlQuary);
    
    console.log(results)

    res.status(200).json(results);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }

});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
