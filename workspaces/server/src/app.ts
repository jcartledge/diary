import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

// TODO: get CORS origin from ENV, configure it.
export const getApp = () =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors());
