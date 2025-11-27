import swaggerJsdoc from "swagger-jsdoc";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

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
        url: API_BASE_URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Point to routes where Swagger comments will go
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;