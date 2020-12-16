const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080/evaluationrecord"
          },
        {
        url: "http://localhost:8080/salesman",
        },
      ],
    },
    apis: ["./routes/evaluationrecord.routes.js", "./routes/salesman.routes.js"],
  };
  

module.exports = options;