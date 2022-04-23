const WorkshopParticipant = require("../models/workshopParticipant");
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
exports.addParticipantWorkshop = async (req, res) => {
  workshopParticipant = WorkshopParticipant({
    participantName: req.body.participantName,
    partcipantPhone: req.body.partcipantPhone,
    partcipantEmail: req.body.partcipantEmail,
    partcipantProfession: req.body.partcipantProfession,
    partcipantCollege: req.body.partcipantCollege,
    workshop: req.body.workshop,
    mode: req.body.mode,
    certificat: req.body.certificat,
  });

  await workshopParticipant.save();
  res.status(200).json({
    message: "added successfully",
    workshopParticipant,
  });
  const mailData = {
    from: req.body.partcipantEmail, // sender address
    to: "malekguedda23@gmail.com", // list of receivers
    subject: `Participation Au workshop ${req.body.workshop}`,
    text: `${req.body.participantName} à participé(e) au workshop ${req.body.workshop}, il/elle préfère un mode ${req.body.mode}, pour  la certification : ${req.body.certificat} . \nLe numéro de téléphone de ce participant est ${req.body.partcipantPhone}, son profession est :  ${req.body.partcipantProfession} à l'etablissement ${req.body.partcipantCollege} `,
  };
  transporter.sendMail(mailData,  (err, info)=> {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
};
exports.readParticipants = async (req, res) => {
  const participantWorkshop = await WorkshopParticipant.find();
  res.status(200).json({
    message: "data success hamdoulillah",
    participantWorkshop,
  });
};
