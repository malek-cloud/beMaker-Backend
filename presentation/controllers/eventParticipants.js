const EventParticipant = require("../models/eventParticipant");
var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "malekguedda23@gmail.com",
    pass: "kisstherain",
  },
  secure: true,
});
exports.addParticipantEvent = async (req, res) => {
  eventParticipant = EventParticipant({
    participantName: req.body.participantName,
    partcipantPhone: req.body.partcipantPhone,
    partcipantEmail: req.body.partcipantEmail,
    partcipantProfession: req.body.partcipantProfession,
    partcipantCollege: req.body.partcipantCollege,
    teamMembers: req.body.teamMembers,
    eventName: req.body.eventName,
  });

  await eventParticipant.save();
  res.status(200).json({
    message: "added successfully",
    eventParticipant,
  });
  const mailData = {
    from: req.body.partcipantEmail, // sender address
    to: "malekguedda23@gmail.com", // list of receivers
    subject: `Participation A un Event ${req.body.eventName}`,
    text: `${req.body.participantName} à participé(e) à l'événement ${req.body.workshop} `,
  };
  transporter.sendMail(mailData,  (err, info)=> {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
};
exports.readParticipants = async (req, res) => {
  const eventParticipant = await EventParticipant.find();
  res.status(200).json({
    message: "data success hamdoulillah",
    eventParticipant,
  });
};
