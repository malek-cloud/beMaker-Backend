const express = require('express');
const { body } = require('express-validator');
const ProjectsControllers = require('../controllers/projects');

const router = express.Router();

router.post(
     '/createProject',
    // body('name').trim().isLength({min :2, max : 3000}),
     ProjectsControllers.createProject
 );
 router.get(
  '/Projects',
  ProjectsControllers.getProjects
);
router.get(
  '/Project/:id',
  ProjectsControllers.getProject
);
router.patch(
  '/editProject/:id',
  ProjectsControllers.updateProject
);
router.delete(
  '/deleteProject/:id',
  ProjectsControllers.deleteProject
);
module.exports = router;
