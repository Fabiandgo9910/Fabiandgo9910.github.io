"use strict";

const express = require("express");
const Imagencontrol = require("../controllers/imagenControlador");
const userCtrol = require("../controllers/user");
const api = express.Router();
const auth = require("../middlewares/auth");

api.get("/imagenes/", Imagencontrol.getImagenes);
api.get("/imagenes/imagen", Imagencontrol.getImagen);
api.post("/imagen", Imagencontrol.saveImagen);
api.put("/imagen", Imagencontrol.upadateImagen);
api.delete("/imagen", Imagencontrol.deleteImagen);
api.get("/imagen", auth, function (req, res) {
  res.status(200).send({ sms: "tienes acceso" });
});

api.post("/signUp", userCtrol.signUp);
api.post("/signIn", userCtrol.signIn);

api.get("/user/", userCtrol.getUser);
api.delete('/eliminarUser', userCtrol.deleteUser);
api.put('/User', userCtrol.upadateUser);
api.get('/User/user', userCtrol.getUsuario);

module.exports = api;

