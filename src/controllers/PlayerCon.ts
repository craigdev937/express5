import express from "express";
import { PlayerModel } from "../models/PlayerMod";

class PlayerClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const player = PlayerModel.create({
                first: req.body.first,
                last: req.body.last,
                age: req.body.age,
                info: req.body.info
            });
            await player.save();
            res.status(res.statusCode).json(player);
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            await PlayerModel
                .find()
                .then((players) => res.status(res.statusCode)
                .json(players));
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };

    
};

export const PLAYER: PlayerClass = new PlayerClass();





