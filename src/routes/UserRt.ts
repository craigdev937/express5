import express from "express";
import { USER } from "../controllers/UserCon";
import { auth } from "../middleware/auth";

export const userRt: express.Router = express.Router();
    userRt.post("/register", USER.Register);
    userRt.post("/login", USER.Login);
    userRt.get("/logout", auth, USER.Logout);
    userRt.get("/me", auth, USER.Me);
    userRt.get("/", USER.FetchAll);
    userRt.get("/:id", USER.GetOne);
    userRt.put("/:id", USER.Update);
    userRt.delete("/:id", USER.Delete);



