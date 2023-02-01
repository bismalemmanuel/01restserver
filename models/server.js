const express = require('express');
const { productRouter } = require('../routes/product.routes');
const { usersRouter } = require('../routes/user.routes');
const cors = require('cors');
const { db } = require('../database/db');
const morgan = require('morgan');
const { categoriesRouter } = require('../routes/category.routes');

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      users: '/api/v1/users',
      products: '/api/v1/products',
      categories: '/api/v1/categories',
    };

    this.database();

    this.middlewares();
    this.routes();
  }

  //rutas
  routes() {
    this.app.use(this.paths.products, productRouter);
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.categories, categoriesRouter);
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }

    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }

    this.app.use(cors());
    this.app.use(express.json());
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync({})
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  // METODO PARA ESCUCHAR POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server us running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
