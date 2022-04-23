const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workshopParticipantSchema = new Schema({
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
  workshop: {
    type: String,
    required: true,
  },

  mode: {
    type: String,
    required: true,
  },

  certificat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("WorkshopParticipant", workshopParticipantSchema);
