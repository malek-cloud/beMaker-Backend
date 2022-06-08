const EventParticipant = require("../controllers/eventParticipants");
const express = require("express");
const router = express.Router();
router.get(
      '/EventParticipants',
      EventParticipant.readParticipants
    );

router.post("/joinEvent", EventParticipant.addParticipantEvent);
module.exports = router;
