"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagenScheme = Schema({
  tipo: String,
  descripcion: String,
  file:String
});

module.exports = mongoose.model("Imagen", imagenScheme);
