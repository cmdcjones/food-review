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
