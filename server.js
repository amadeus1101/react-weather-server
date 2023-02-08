const express = require("express");
const axios = require("axios");
const cors = require("cors");
const server = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();

server.use(
  cors({
    origin: "*",
  })
);

server.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
  let endpoint = process.env.API_BASE_URL + req.params.endpoint;

  let params = {};

  // params[process.env.API_KEY_PARAM_NAME] = process.env.API_KEY;

  for (const [field, value] of Object.entries(req.query)) {
    params[field] = value;
  }

  axios
    .get(endpoint, {
      params: params,
      headers: {
        "X-Yandex-API-Key": "cd21cc0f-f0db-455f-a226-e7c988d360d5",
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

server.listen(PORT, () => {
  console.log("Server startd");
});
