var Sequelize  = require('Sequelize');


var sequelize = new Sequelize('evento_tech_day', 'root', 'yadiel', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var Expositor = sequelize.define('Expositor', {
    nombre: {
      type: Sequelize.STRING,
      field: 'nombre' 
    },
    github_id: {
      type: Sequelize.STRING,
      field:'github_id'
    }

  }, {
    freezeTableName: true 
  });

  var p1=Expositor.sync({force: true}).then(function () {
  
    return Expositor.create({
      nombre: 'Ismael Leon',
      github_id: 'https://github.com/ismael-bit'
    });
  });


  