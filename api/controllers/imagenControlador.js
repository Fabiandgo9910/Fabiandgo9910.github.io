"use stric";
const { scrypt } = require("crypto");
const { brotliDecompress } = require("zlib");
const { db } = require("../config");

// *****************importaciones**********************
const Imagen = require("../models/imagenModelo");

//***********************funciones***************

function getImagenes(req, res) {
  Imagen.find({}, (err, Imagen) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}` });
    if (!Imagen) return res.status(404).send({ mensage: "No Hay producto" });

    res.status(200).send({ Imagen });
  });
}
function getImagen(req, res) {
  let ImagenId = req.query.id;
  Imagen.findById(ImagenId, (err, Imagen) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}` });
    if (!Imagen)
      return res.status(404).send({ mensage: "no esta en la base de datos" });

    res.status(200).send({ Imagen });
  });
}


function upadateImagen(req, res) {
  let ImagenId = req.body.id;
  let update = req.body;
  Imagen.findByIdAndUpdate(ImagenId, update, (err, ImagenUpadated) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });

    res.status(200).send({ ImagenUpadated, code: 2 });
  });
}

function deleteImagen(req, res) {
  let ImagenId = req.body.id;

  Imagen.findById(ImagenId, (err, Imagen) => {
    if (err) return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });

    Imagen.deleteOne((err) => {
      if (err) return res.status(500).send({ mensage: `Error  ${err}`, code: 2 });
      res.status(200).send({ mensage: "Imagen eliinado", code: 1 });
    });
  });
}

function saveImagen(req, res) {
  let Imagenes = new Imagen();
  Imagenes.descripcion = req.body.descripcion;
  Imagenes.tipo = req.body.tipo;
  Imagenes.file = req.body.file;

  Imagenes.save((err, ImagenStored) => {
    if (err) res.status(500).send({ mensage: "error al salvar" });

    res.status(200).send({ Imagen: ImagenStored, code: 1 });
  });
}

module.exports = {
  getImagen,
  getImagenes,
  upadateImagen,
  deleteImagen,
  saveImagen,
};
