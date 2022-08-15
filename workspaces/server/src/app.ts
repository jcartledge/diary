import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export const getApp = () =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors());
