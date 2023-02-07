import express, {response} from "express";
import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";
import morgan from "morgan";

import pokeRouter from "./routes/pokemonRoutes.js";

export default async function() {
    //db setup
    const adapter = new JSONFile("db.json");
    const db = new Low(adapter);

    await db.read();

    db.data = db.data || { pokemon: []};

    await db.write();


    //set up express
    const app = express();

    //middlewares
    app.use(express.json());
    app.use(morgan('tiny'));

    //linking routes
    app.use("/pokemon", pokeRouter(db));
    


    return app;
}

