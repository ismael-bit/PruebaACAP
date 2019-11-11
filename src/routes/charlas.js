import express from 'express'
import mysql from 'mysql'

var routerCharla = express.Router();

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'yadiel',
    database: 'evento_tech_day',
    port: 3306

  });
  
connection.connect();

// Lista de charlas
routerCharla.get('/', (req, res) => {
    connection.query('SELECT * from charla', function(err, rows, fields) {
        if (err) {
            res.send('Error '+err);
        } else {
            var charlas = []
            rows.forEach(c => {
                charlas.push({ 
                    id: c.id,
                    name : c.nombre, 
                    hora : c.hora
                 })
            });
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(charlas)); 
            // console.log('The solution is: ', rows[0].nombre);
        }
    });
})

routerCharla.post('/', (req, res) => {

    if(!req.body.nombre || !req.body.hora || req.body.expositor_id==0) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, hora y expositor son requeridos'
        };
       }

    var params = [req.body.nombre, req.body.hora, req.body.expositor_id];

    connection.query('INSERT INTO charla(nombre, hora, expositor_id) VALUES(?,?,?)',params, function(err, rows, fields) {
        if (err) {
            respuesta = {
                error: true,
                codigo: 500,
                mensaje: 'Error Interno' + err
               };
        } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Registro creado!"
               };
        }
        res.send(respuesta)
    });

})

routerCharla.put('/:id', (req, res) => {
    var id = req.params.id
    var cuerpo = req.body

    if(!cuerpo.nombre || !cuerpo.hora || cuerpo.expositor_id==0) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, hora y expositor son requeridos'
        };
       }

    var params = [cuerpo.nombre, cuerpo.hora, cuerpo.expositor_id,id];
    var strUpdate = 'UPDATE charla SET  nombre = ?, hora = ?, expositor_id = ? WHERE id = ?'

    connection.query(strUpdate,params, function(err, rows, fields) {
        if (err) {
            respuesta = {
                error: true,
                codigo: 500,
                mensaje: 'Error Interno' + err
               };
        } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Registro Actualizado"
               };
        }
        res.send(respuesta)
    });    

})

routerCharla.get('/:id', (req, res) => { 
    connection.query('SELECT * from charla Where id=?',[req.params.id], function(err, rows, fields) {
        if (err) {
            res.send('Error '+err);
        } else {
            var charlas = []
            rows.forEach(c => {
                charlas.push({ 
                    id: c.id,
                    name : c.nombre, 
                    hora : c.hora
                 })
            });
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(charlas)); 
            // console.log('The solution is: ', rows[0].nombre);
        }
    });
})

export default routerCharla;