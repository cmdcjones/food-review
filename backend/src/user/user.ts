import { Request, Response } from "express";
import { prisma } from "..";

export async function getUser(req: Request, res: Response) {
    // TODO: Error handling
    const user = await prisma.user.findUnique({
        where: {
            username: "cmdcjones",
        },
    });
    res.status(200).send(`Currently viewing user: ${user?.username}`);
}

export async function createUser(req: Request, res: Response) {
    // TODO: Error handling
    const newUser = await prisma.user.create({
        data: {
            username: "cmdcjones",
            password: "plaintextpass",
            email: "test@test",
            first_name: "Dom",
            last_name: "Jones",
        },
    });
    res.status(200).json({ username: newUser?.username, password: newUser?.password });
}
