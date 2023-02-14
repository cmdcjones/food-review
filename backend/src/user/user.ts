import { Request, Response } from "express";
import { prisma } from "..";

export async function getUser(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            username: "cmdcjones",
        },
    });
    console.log(user);
    res.status(200).send(`Currently viewing user: ${user?.username}`);
}

export async function createUser(req: Request, res: Response) {
    const newUser = await prisma.user.create({
        data: {
            username: "cmdcjones",
            email: "test@test",
            first_name: "Dom",
            last_name: "Jones",
        },
    });

    console.log(`User added: ${newUser?.username}`);
}
