import express from "express";
import { PostModel } from "../models/PostMod";

class PostClass {
    Create: express.Handler = async (req, res, next) => {
        const { title } = req.body;
        const user = res.locals.user;
        if (title.trim() === "") {
            res
                .status(res.statusCode)
                .json({ title: "Title must NOT be empty" })
        }
        try {
            const post = PostModel.create({
                title: req.body.title,
                body: req.body.body,
                subName: req.body.subName,
                slug: req.body.slug,
                user: user
            });
            await post.save();
            res
                .status(res.statusCode)
                .json(post);
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            await PostModel
                .find()
                .then((posts) => res.status(res.statusCode)
                .json(posts));
        } catch (error) {
            res
                .status(res.statusCode)
                .json(res.statusMessage);
            next(error);
        }
    };
};

export const POST: PostClass = new PostClass();



