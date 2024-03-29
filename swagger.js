const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Documentation for Your API',
    },
  },
  apis: ['./routes/*.js'], // Path to the files containing OpenAPI annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
