import express from "express";
import mysql from "mysql";

var routerExpositor = express.Router();

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ""
};

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "yadiel",
  database: "evento_tech_day",
  port: 3306
});

connection.connect();

// Lista de expositores
routerExpositor.get("/", (req, res) => {
  connection.query("SELECT * from expositor", function(err, rows, fields) {
    if (err) {
      res.send("Error " + err);
    } else {
      var expositores = [];
      rows.forEach(c => {
        expositores.push({
          id: c.id,
          name: c.nombre,
          correo: c.correo,
          cuenta_github: c.cuenta_github
        });
      });
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(expositores));
    }
  });
});

// expositores por Id
routerExpositor.get("/:id", (req, res) => {
  connection.query(
    "SELECT * from expositor Where id=?",
    [req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.send("Error " + err);
      } else {
        var expositores = [];
        rows.forEach(c => {
          expositores.push({
            id: c.id,
            name: c.nombre,
            correo: c.correo,
            cuenta_github: c.cuenta_github
          });
        });
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(expositores));
        // console.log('The solution is: ', rows[0].nombre);
      }
    }
  );
});

// Registrar Expositor
routerExpositor.post("/", (req, res) => {
  if (!req.body.nombre || !req.body.correo || !req.body.cuenta_github) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre, correo y cuenta_github son requeridos"
    };
  }

  var params = [req.body.nombre, req.body.correo, req.body.cuenta_github];

  connection.query(
    "INSERT INTO expositor(nombre, correo, cuenta_github) VALUES(?,?,?)",
    params,
    function(err, rows, fields) {
      if (err) {
        respuesta = {
          error: true,
          codigo: 500,
          mensaje: "Error Interno" + err
        };
      } else {
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: "Registro creado!"
        };
      }
      res.send(respuesta);
    }
  );
});

// Actualizar Expositor
routerExpositor.put("/:id", (req, res) => {
  var id = req.params.id;
  var cuerpo = req.body;

  if (!cuerpo.nombre || !cuerpo.correo || !cuerpo.cuenta_github) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre, correo y cuenta_github son requeridos"
    };
  }

  var params = [cuerpo.nombre, cuerpo.correo, cuerpo.cuenta_github, id];
  var strUpdate =
    "UPDATE expositor SET  nombre = ?, correo = ?, cuenta_github = ? WHERE id = ?";

  connection.query(strUpdate, params, function(err, rows, fields) {
    if (err) {
      respuesta = {
        error: true,
        codigo: 500,
        mensaje: "Error Interno" + err
      };
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Registro Actualizado"
      };
    }
    res.send(respuesta);
  });
});

export default routerExpositor;
