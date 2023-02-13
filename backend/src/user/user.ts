import { Request, Response } from "express";


export async function getUser(req: Request, res: Response) {
    const user = "Dominique Jones";
    res.status(200).send(`Currently viewing user: ${user}`);
}
