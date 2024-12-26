require("dotenv").config()
const {PORT}=process.env

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Manager API',
        version: '1.0.0',
        description: 'A  Task Manager API',
      },
      servers: [
        {
          url: `http://localhost:${PORT}/api`,
          description: 'Development server',
        },
      ],
  
    },
    apis: ['./Controller/*.js'], 
  };

  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerDocs=swaggerJsdoc(swaggerOptions);
module.exports=swaggerDocs;
