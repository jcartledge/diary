import express from "express";

export const healthCheckRoute = express.Router();

healthCheckRoute.get("/healthcheck", (_, res) => {
  res.status(200).send({ health: "OK" });
});
