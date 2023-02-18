import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "..";

const SALT_ROUNDS = 12;

export async function createUser(req: Request, res: Response) {
    
    const { username, password, email, first_name, last_name } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Invalid username or password." });
    } else if (!email) {
        res.status(400).json({ message: "Please enter a valid email address." });
    } else if (!first_name || !last_name) {
        res.status(400).json({ message: "Please enter a valid first name and last name." });
    }

    try {
        const checkUserExists = await Promise.all(
            [
            prisma.user.findUnique({ where: { username: username, }, }),
            prisma.user.findUnique({ where: { email: email, }, }),
        ]
        );

        if (checkUserExists.some(data => data !== null)) {
            res.status(400).json({ message: "A user with this username/email already exists." });
        }

        const hashedResult = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedResult,
                email: email,
                first_name: first_name,
                last_name: last_name,
            },
        });

        res.status(200).json({ username: newUser?.username, password: newUser?.password });
    } catch (err) {
        res.status(500).json({ message: "There was an error creating a new user record.", err });
    }

}

export async function loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Invalid username or password." });
    }

    try {
        const userRecord = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (userRecord && await bcrypt.compare(password, userRecord.password)) {
            res.status(200).json({ username: userRecord.username, email: userRecord.email });
        } else {
            res.status(400).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error retrieving a user record", err });
    }
}
