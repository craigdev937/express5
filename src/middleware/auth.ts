import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserMod";

export const auth: express.Handler = async (req, res, next) => {
    try {
        const token = req.cookies.token;
            if (!token) throw new Error("Not authenticated!");
            const email: any = jwt.verify(token, process.env.JWT_SECRET!);
            const user = await UserModel.findOneBy({ email });
            if (!user) throw new Error("Not authenticated!");
            res.locals.user = user;
            next();
    } catch (error) {
        res
            .status(res.statusCode)
            .json(res.statusMessage);
        next(error);
    }
};


