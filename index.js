const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
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
        "X-Yandex-API-Key": "88fce1b1-c7ea-44e9-aec5-915ba8a38458",
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log("app startd");
});
