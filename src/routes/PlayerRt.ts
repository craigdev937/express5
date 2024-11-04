import express from "express";
import { IndexHome } from "../controllers/PlayerCon";

export const playRt: express.Router = express.Router();
    playRt.get("/", IndexHome);



