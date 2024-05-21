const User = require("../models/user.js");
const service = require("../service");

const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const user = require("../models/user.js");

function signUp(req, res) {
  console.log(req.body.displeyName);
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
    admin: req.body.admin,
  });
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result == null) {
        user.save((err) => {
          if (err)
            res.status(500).send({ message: "Error al crear el usuario" });

          res.status(200).send({ 
            token: service.createToken(user),
            admin: user.admin,
            displayName: user.displayName
            });
        });
      } else {
        res.status(403).send({ sms: "Ya Existe" });
      }
    })
    .catch((err) => {
      res.status(500).send({ sms: `ERROR ${err}` });
    });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ sms: err });
    if (!user)
      return res.status(404).send({ sms: "No esta en base de dato", code: 3 });

    console.log(user);

    bcrypt.compare(req.body.password, user.password, function (err, result) {
      console.log(err);
      if (result == true) {
        res.status(200).send({
          code: 1,
          sms: `te has logueado `,
          token: service.createToken(user),
          admin: user.admin,
          displayName: user.displayName
        });
      } else {
        res.status(403).send({
          code: 2,
          sms: `wrong pass `,
        });
      }
    });
  });
}
function upadateUser(req, res) {
  let UserId = req.body.id;
  let update = req.body;
  console.log(update);
  user.findByIdAndUpdate(UserId, update, (err, userUpadated) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });
    res.status(200).send({ userUpadated, code: 1 });
  });
}

function deleteUser(req, res) {
  let UserId = req.body.id;

  user.findById(UserId, (err, user) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });

    user.deleteOne((err) => {
      if (err)
        return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });
      res.status(200).send({ mensage: "User eliminado", code: 1 });
    });
  });
}
function getUser(req, res) {
  User.find({}, (err, User) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}` });
    if (!User) return res.status(404).send({ mensage: "No hay usario" });

    res.status(200).send({ User });
  });
}

function getUsuario(req, res) {
  console.log(req);
  let userid = req.query.id;
  User.findById(userid, (err, usuario) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}` });
    if (!usuario)
      return res.status(404).send({ mensage: "no esta en la base de datos" });

    res.status(200).send({ usuario });
  });
}

module.exports = {
  signIn,
  signUp,
  getUsuario,
  upadateUser,
  deleteUser,
  getUser,
};

// codes

//  1 logueado

//  2  contrasena mal
