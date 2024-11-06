import express from "express";
import { USER } from "../controllers/UserCon";

export const userRt: express.Router = express.Router();
    userRt.post("/register", USER.Register);
    userRt.post("/login", USER.Login);
    userRt.get("/logout", USER.Logout);
    userRt.get("/me", USER.Me);
    userRt.get("/", USER.FetchAll);
    userRt.get("/:id", USER.GetOne);
    userRt.put("/:id", USER.Update);
    userRt.delete("/:id", USER.Delete);



