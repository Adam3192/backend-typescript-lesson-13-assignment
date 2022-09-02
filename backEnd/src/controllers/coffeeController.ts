import { RequestHandler } from "express";
import { Coffee, ICoffee } from "../models/coffee";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllCoffee: RequestHandler = async (req, res, next) => {
    let coffeeList = await Coffee.find();
    res.status(200).json(coffeeList);
}

export const getOneCoffee: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let coffee = await Coffee.findById(itemId);
    res.status(200).json(coffee);
}

export const addCoffee: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const newCoffee: ICoffee = new Coffee({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        await newCoffee.save();
        res.status(201).json(newCoffee);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const editCoffee: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    const updatedCoffee: ICoffee = new Coffee({
        _id: itemId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    await Coffee.findByIdAndUpdate(itemId, { $set: updatedCoffee })

    res.status(200).json(updatedCoffee);
}

export const deleteCoffee: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let result = await Coffee.findByIdAndDelete(itemId);
    res.status(200).json(result);
}