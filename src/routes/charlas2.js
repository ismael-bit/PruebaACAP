import express from 'express'
import Sequelize from 'Sequelize'

var routerCharla2 = express.Router();

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

  const charla = sequelize.define('charlas', {
    // attributes
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hora: {
      type: Sequelize.STRING,
      allowNull: false 
    },
    expositor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: 'expositors', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name        
    },
      tags: {
          type: Sequelize.STRING,
          allowNull: false 
        }
}, {
    timestamps: false
  });

  const expositor = sequelize.define(
    "expositor",
    {
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
    },{
      timestamps: false
    });

    //expositor.hasMany(charla, {foreignKey: 'id'})
    charla.belongsTo(expositor, {foreignKey: 'expositor_id'})

  // Lista de charlas
  routerCharla2.get('/', (req, res) => {
    charla.findAll({
      include: [{
        model: expositor,
        required: true
       }]
    }).then(charlas => {
        res.setHeader('Content-Type', 'application/json')
        //console.log(JSON.stringify(charlas))
        res.send(JSON.stringify(charlas)); 
        //console.log("All users:", JSON.stringify(expositores,null,4));
    })
    .catch(error => {
        //console.error('Error:', error)
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
    }) ;
})

// charlas por Id
routerCharla2.get('/:id', (req, res) => { 
    var idexpo = req.params.id
    charla.findOne(
      {
        include: [{
          model: expositor,
          required: true,
          where: { id: idexpo}

         }]
      }).then(charlas => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(charlas)); 
        //console.log("All users:", JSON.stringify(expositores,null,4));
    })
    .catch(error => {
        //console.error('Error:', error)
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(error))   
    }) ;
})


// Registrar Charla
routerCharla2.post('/', (req, res) => {

    if(!req.body.nombre || !req.body.hora || req.body.expositor_id==0) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, hora y expositor son requeridos'
        };
       }

    var obj_charla  = {
        nombre: req.body.nombre,
        tags: req.body.tags,
        expositor_id: req.body.expositor_id,
        hora: req.body.hora
    }

    charla.create(obj_charla).then(exp => {
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
routerCharla2.put('/:id', (req, res) => {
    var id = req.params.id
    var cuerpo = req.body

    if(!cuerpo.nombre || !cuerpo.hora || !cuerpo.tags || cuerpo.expositor_id==0) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo nombre, hora, tags y expositor son requeridos'
        };
       }

    var obj_charla = {
        nombre: cuerpo.nombre,
        hora: cuerpo.hora,
        tags: cuerpo.tags,
        expositor_id: cuerpo.expositor_id
    }

    
    charla.update(obj_charla, {
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

// Elimiar Charla
routerCharla2.delete("/:id", (req, res) => {
  var id = req.params.id;
  if (id === 0) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El id debe ser mayor que cero"
    };
  }

  charla
    .destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Registro Eliminado"
      };
      res.send(respuesta);
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(error));
    });
});


export default routerCharla2;