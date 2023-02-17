import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import { getUser } from "./user/user";
import { createUser, loginUser } from "./auth/auth.server";
import * as dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = process.env.APP_PORT;
let prisma: PrismaClient;

declare global {
    var  __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    prisma.$connect;
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect;
    }
    prisma = global.__db;
}

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world");
});

app.get("/user", getUser);
app.post("/newuser", createUser);
app.post("/auth/login", loginUser);

app.listen(process.env.APP_PORT, () => {
    console.log(`Express server up at http://localhost:${PORT}`);
});

export { prisma };
