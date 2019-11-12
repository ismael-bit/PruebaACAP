import express from 'express'
import Sequelize from 'Sequelize'

var routerExpositor2 = express.Router();

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

var sequelize = new Sequelize('evento_tech_day', 'root', 'yadiel', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

  const expositor = sequelize.define('expositor', {
    // attributes
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cuenta_github: {
      type: Sequelize.STRING,
      allowNull: false 
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false 
      }
}, {
    timestamps: false
  });


  // Lista de expositores
routerExpositor2.get('/', (req, res) => {
    expositor.findAll().then(expositores => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(expositores)); 
        //console.log("All users:", JSON.stringify(expositores,null,4));
    })
    .catch(error => {
        //console.error('Error:', error)
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
    }) ;
})

// Expositores por Id
routerExpositor2.get('/:id', (req, res) => { 
    var idexpo = req.params.id
    expositor.findAll({
        where: {
          id: idexpo
        }
      }).then(expositores => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(expositores)); 
        //console.log("All users:", JSON.stringify(expositores,null,4));
    })
    .catch(error => {
        //console.error('Error:', error)
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
    }) ;
})


// Registrar Expositor
routerExpositor2.post('/', (req, res) => {

    if(!req.body.nombre || !req.body.correo || !req.body.cuenta_github) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, correo y cuenta_github son requeridos'
        };
       }

    var obj_expositor = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        cuenta_github: req.body.cuenta_github
    }

    expositor.create(obj_expositor).then(exp => {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "Registro creado!. Id " + exp.id
           };
           console.log(respuesta)
        res.send(respuesta)
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
     });

})

// Actualizar Expositor
routerExpositor2.put('/:id', (req, res) => {
    var id = req.params.id
    var cuerpo = req.body

    if(!cuerpo.nombre || !cuerpo.correo || !cuerpo.cuenta_github) {
      respuesta = {
       error: true,
       codigo: 502,
       mensaje: 'El campo nombre, correo y cuenta_github son requeridos'
      };
     }

    var obj_expositor = {
        nombre: cuerpo.nombre,
        correo: cuerpo.correo,
        cuenta_github: cuerpo.cuenta_github
    }

    expositor.update(obj_expositor, {
        where: {
          id: id
        }
      }).then(() => {

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "Registro Actualizado"
           };
        res.send(respuesta)

    })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
     });

})

export default routerExpositor2;
