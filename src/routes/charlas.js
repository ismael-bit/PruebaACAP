import express from 'express'
import mysql from 'mysql'

var routerCharla = express.Router();

var connection = mysql.createConnection({
    host     : '192.168.122.1',
    user     : 'root',
    password : 'example',
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
    //TODO: 
    res.send('Guardar charla')
})

routerCharla.put('/:id', (req, res) => {
    //TODO: 
    res.send('Guardar charla')
})

routerCharla.get('/:id', (req, res) => { 
    res.send('Charla id '+req.params.id)
})

export default routerCharla;