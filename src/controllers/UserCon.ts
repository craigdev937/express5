import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { validate, isEmpty } from "class-validator";
import { UserModel } from "../models/UserMod";

class UserClass {
    Register: express.Handler = async (req, res, next) => {
        try {
            let errors: any = {};
            const emailUser = await UserModel.findOneBy({
                email: req.body.email
            });
            if (emailUser) errors.email = "Email is already taken!";
            if (Object.keys(errors).length > 0) {
                res.status(res.statusCode).json(errors);
            };
            const user = UserModel.create({
                first: req.body.first, last: req.body.last,
                email: req.body.email, password: req.body.password
            });
            errors = await validate(user);
            if (errors.length > 0) 
                res
                    .status(res.statusCode)
                    .json({ errors });
            await user.save();
            res
                .status(res.statusCode)
                .json(user);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Login: express.Handler = async (req, res, next) => {
        try {
            let errors: any = {};
            if (isEmpty(req.body.email)) errors.email = "Please enter your Email!";
            if (isEmpty(req.body.password)) errors.password = "Please enter your Password!";
            if (Object.keys(errors).length > 0) {
                res.status(res.statusCode).json(errors);
            };
            const user = await UserModel.findOneBy({
                email: req.body.email
            });
            if (!user) res.status(res.statusCode).json({ error: "User not found!" });            
            const pMatch = bcrypt.compare(req.body.password, user!.password)
            if (!pMatch) {
                res.status(res.statusCode).json({password: "Password is incorrect!"});
            };

            const token = jwt.sign(req.body.email, process.env.JWT_SECRET!);
            res.set("Set-Cookie", cookie.serialize("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600,
                path: "/"
            }));
            res
                .status(res.statusCode)
                .json({ user, token });
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Me: express.Handler = async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) throw new Error("Unquthenticated!");
            const email: any = jwt.verify(token, process.env.JWT_SECRET!);
            const user = await UserModel.findOneBy({ email });
            if (!user) throw new Error("Unquthenticated!");
            res
                .status(res.statusCode)
                .json(user);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Logout: express.Handler = async (req, res, next) => {
        try {
            res.set("Set-Cookie", cookie.serialize("token", "", {
                secure: true,
                sameSite: "strict",
                expires: new Date(0),
                path: "/"
            }));
            res
                .status(res.statusCode)
                .json({ success: true });
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            await UserModel
                .find()
                .then((users) => res.status(res.statusCode)
                .json(users));
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const player = await UserModel.findOne({
                where: {
                    id: parseInt(req.params.id)
                }
            });
            res
                .status(res.statusCode)
                .json(player);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const userID = await UserModel.findOneBy({
                id: parseInt(req.params.id)
            })
            const player = UserModel.merge(userID!, {
                first: req.body.first,
                last: req.body.last,
                email: req.body.email,
                password: req.body.password
            });
            await player.save();
            res
                .status(res.statusCode)
                .json(player);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    Delete: express.Handler = async (req, res, next) => {
        try {
            const user = await UserModel.delete({
                id: parseInt(req.params.id)
            });
            res
                .status(res.statusCode)
                .json(user);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };
};

export const USER: UserClass = new UserClass();





