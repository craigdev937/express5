import express from "express";
import { auth } from "../middleware/auth";
import { POST } from "../controllers/PostCon";

export const postRt: express.Router = express.Router();
    postRt.post("/", auth, POST.Create);
    postRt.get("/", POST.FetchAll);


