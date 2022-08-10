import bodyParser from "body-parser";
import express from "express";

export const getApp = () =>
  express().use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
