import express from "express";
import { nanoid } from "nanoid";

export default function setupPokemonRouter(db) {
    const router = express.Router();

    //get all pokemon
    router.get("/", function(req, res) {
        res.status(200).json({
            success: true,     //return true if the data is found
            pokemon: db.data.pokemon,  //the pokemon being returned
            // type: db.data.type,
            // weight: db.data.weight,
            // height: db.data.height
        });

    });

    router.get("/:pokemon", (req, res) => {
        const pokemon = req.params.pokemon;

        const poke = db.data.pokemon.find((currentPokemon) => currentPokemon.id === pokemon);
        // const pokeId = db.data.pokemon.findIndex(currentPokemon => currentPokemon.id === pokemon);
        
        res.status(200).json({
            success: true,     //return true if the data is found
            pokemon: db.data.poke,  //the pokemon being returned
        });

    });

    //add to database
    router.post("/", (req, res) => {
        db.data.pokemon.push({
            id: nanoid(4),  //id of pokemon
            name: req.body.pokemon,  //name of pokemon
            // type: req.body.type,
            // weight: req.body.weight,
            // height: req.body.height
        })

        db.write(); //save to database

        res.status(200).json({
            success: true,
        });
    });

    //edit a pokemon
    router.put("/:pokemon", (req, res) => {
        const pokemon = req.params.pokemon;

        const pokeId = db.data.pokemon.findIndex(currentPokemon => currentPokemon.id === pokemon); //find pokemon with id in database

        res.status(200).json({
            success: true,
            pokemon: db.data.pokeId,
        });
    });

    //delete a pokemon 
    router.delete("/:pokemon", (req, res) => {
        const pokemon = req.params.pokemon;

        const pokeId = db.data.pokemon.findIndex(currentPokemon => currentPokemon.id === pokemon); //find pokemon with id in database

        db.data.pokemon.splice(pokeId, 1);
        db.write();

        res.status(200).json({
            success: true,
            // pokemon: db.data.pokeId,
        })
    });

    return router;
}