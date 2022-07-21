const Employee = require("../models/employee");
exports.createEmployee = async (req, res, next) => {
  const employee = new Employee({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    numero: req.body.numero,
    password: req.body.password,
  });
  await employee.save();
  res.status(200).json({
    message: "finally Employee created w  hamdoulillah",
    employee,
  });
};
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({
    message: "finally Employees got w  hamdoulillah",
    employees
  });
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this Employee was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Employee doesn't exist!" });
  }
};
exports.loginEmployee = async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      const employee = await Employee.findOne({ email: email, password: password })
      try {
        res.status(200).json({
          message: "this employee is found w  hamdoulillah",
          employee,
        });
      } catch {
        res.status(404);
        res.send({ error: "employee doesn't exist!" });
      }
    };