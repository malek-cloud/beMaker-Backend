const Field = require("../models/fields");
exports.createField = async (req, res, next) => {
  
  const name = req.body.name;
  const description = req.body.description;
  console.log(name + " this should be the name");
  const field = new Field({
    name: req.body.name,
    description: req.body.description,
  });
  await field.save();
  res.status(200).json({
    message: "finally field created w  hamdoulillah",
    field,
    
  });
};
exports.getFields = async (req, res) => {
  const fields = await Field.find();
  res.status(200).json({
     message: "finally fields got w  hamdoulillah",
     fields,
     activity : "field"
   });
};

exports.getField = async(req, res, next)=>{
     const field = await Field.findOne({_id : req.params.id})
     res.status(200).json({
          message: "this field is found w  hamdoulillah",
          field,
        });
};

exports.updateField = async (req, res) => {
	try {
		const field = await Field.findOne({ _id: req.params.id })

		if (req.body.name) {
			field.name = req.body.name
		}

		if (req.body.description) {
			field.description = req.body.description
		}

		await field.save()
		res.status(200).json({
               message: "this field is updated successfully w  hamdoulillah",
               field,
             });
	} catch {
		res.status(404)
		res.send({ error: "field doesn't exist!" })
	}
};

exports.deleteField = async (req, res) => {
     try {
		await Field.deleteOne({ _id: req.params.id })
		res.status(200).json({
               message: "this field was deleted successfully w  hamdoulillah",
             });
	} catch {
		res.status(404)
		res.send({ error: "Field doesn't exist!" })
	}
}