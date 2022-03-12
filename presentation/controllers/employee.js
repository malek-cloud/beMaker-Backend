const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
exports.createEmployee = (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       const error = new Error('Validation failed.');
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
     }
     const email = req.body.email;
     const nom = req.body.nom;
     const prenom = req.body.prenom;
     const phone = req.body.numero;
     const password = req.body.password;
     const shift = req.body.shift;
     const typeEmployee = req.body.typeEmployee;
     bcrypt
       .hash(password, 12) //hash the pw with a string of 12
       .then(hashedPw => {
         const employee = new Employee({
           email: email,
           password: hashedPw,
           nom: nom,
           prenom: prenom,
           phone: phone,
           shift : shift,
           typeEmployee : typeEmployee
         });
         return employee.save();
         
       })
       .then(result => {
         const token = jwt.sign(
           {
             email: email,
             employeeId: result._id.toString()
           },
           'somesupersecretsecretemp',
           { expiresIn: '1h' }
         );
         res.status(201).json({ message: 'employee created!', employe: result, token : token, expiryDate : '1' });
         
       })
       .catch(err => {
         if (!err.statusCode) {
           err.statusCode = 500;
         }
         next(err); //throw err
       });
   };

   exports.login = (req, res, next) => {
     const email = req.body.email;
     const password = req.body.password;
     let loadedEmployee;
     Employee.findOne({ email: email })
       .then(Employee => {
         if (!Employee) {
           const error = new Error('A Employee with this email could not be found.');
           error.statusCode = 401;
           throw error;
         }
         loadedEmployee = Employee;
         return bcrypt.compare(password, Employee.password);
       })
       .then(isEqual => {
         if (!isEqual) {
           const error = new Error('Wrong password!');
           error.statusCode = 401;
           throw error;
         }
         const token = jwt.sign(
           {
             email: loadedEmployee.email,
             EmployeeId: loadedEmployee._id.toString()
           },
           'somesupersecretsecretemp',
           { expiresIn: '1h' }
         );
         res.status(200).json({ token: token, Employee: loadedEmployee, expiryDate: '1', });
       })
       .catch(err => {
         if (!err.statusCode) {
           err.statusCode = 500;
         }
         next(err);
       });
   };
   exports.getEmployee = (req, res)=>{
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId).then(employee =>
         {
              if(!employee){
                   const error = new Error('could not find this employee sadly');
                   error.statusCode= 404 ;
                   throw error ;
              }
               res.statusCode(200).json({
                   message : 'here\'s your employee',
                   employee : employee,
              })
         }).catch(err =>{
              if(!err.statusCode){
                   err.statusCode=500 ;
              }
              
         });
};