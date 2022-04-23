const WorkshopParticipant = require("../controllers/workshopParticipant");
const express = require("express");
const router = express.Router();
const ProjectsControllers = require('../controllers/projects');
router.get(
      '/participants',
      WorkshopParticipant.readParticipants
    );

router.post("/joinWorkshop", WorkshopParticipant.addParticipantWorkshop);
module.exports = router;
