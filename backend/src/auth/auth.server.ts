import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "..";

const SALT_ROUNDS = 10;

export async function createUser(req: Request, res: Response) {
    // TODO: Error handling
    const hashedResult = await bcrypt.hash("plaintextpass", SALT_ROUNDS);

    try {
        const newUser = await prisma.user.create({
            data: {
                username: "cmdcjones",
                password: hashedResult,
                email: "test@test",
                first_name: "Dom",
                last_name: "Jones",
            },
        });

        res.status(200).json({ username: newUser?.username, password: newUser?.password });
    } catch (err) {
        res.status(500).json({ message: "There was an error creating a new user record", err });
    }

}

export async function loginUser(req: Request, res: Response) {
    try {
        const userRecord = await prisma.user.findUnique({
            where: {
                username: "cmdcjones",
            },
        });

        if (userRecord && await bcrypt.compare("plaintextpass", userRecord.password)) {
            res.status(200).json({ username: userRecord.username, email: userRecord.email });
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error retrieving a user record", err });
    }
}
