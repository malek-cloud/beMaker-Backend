const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventParticipantSchema = new Schema({
  participantName: {
    type: String,
    required: true,
  },
  partcipantPhone: {
    type: String,
    required: true,
  },
  partcipantEmail: {
    type: String,
    required: true,
  },
  partcipantProfession: {
    type: String,
    required: true,
  },

  partcipantCollege: {
    type: String,
    required: true,
  },
  partcipantCollege: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    teamMembers: {
      type: String,
    },

  
});

module.exports = mongoose.model("EventParticipant", EventParticipantSchema);
