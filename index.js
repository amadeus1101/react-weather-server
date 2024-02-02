import express from "express";
import axios from "axios";
import cors from "cors";
import { config } from "dotenv";
import { data } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
  })
);
app.get("/default", (req, res) => {
  res.send(data);
});

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
  let endpoint = "https://api.weather.yandex.ru" + req.params.endpoint;
  let params = {};
  //params[process.env.API_KEY_PARAM_NAME] = process.env.API_KEY;

  for (const [field, value] of Object.entries(req.query)) {
    params[field] = value;
  }

  axios
    .get(endpoint, {
      params: params,
      headers: {
        "X-Yandex-API-Key": "1191cb9b-c919-42ae-805c-f976499d8880",
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
