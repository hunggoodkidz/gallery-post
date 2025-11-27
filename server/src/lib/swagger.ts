import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gallery Post API",
      version: "1.0.0",
      description:
        "API documentation for the Gallery Post application (Photo Upload + Comments)",
    },
    servers: [
      {
        url: "http://localhost:4000", // Change later for Render deployment
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Point to routes where Swagger comments will go
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;