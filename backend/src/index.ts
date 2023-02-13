import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import { getUser } from "./user/user";

const app: Express = express();
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

app.listen(process.env.APP_PORT, () => {
    console.log(`Express server up at http://localhost:${process.env.APP_PORT}`);
});

export { prisma };
