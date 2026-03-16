import {getPokemon} from "../api/getPokemon.js";
import {getMove} from "../api/getMove.js";
import {Pokemon} from "./PokemonClass.js";
import {RenderArena} from "./RenderArena.js";

let players = [];
let playerTurn = 0;

let chosenMoves = [];

document.querySelector(".api-btn").addEventListener("click", async () => {
    console.log("Button press");
    await startBattle();
});

const createPlayerStates = async () => {
    const p1Pokemon = document.querySelector(".player-one-pokemon").value;
    const p2Pokemon = document.querySelector(".player-two-pokemon").value;

    const pokemons = [p1Pokemon, p2Pokemon];

    for (const pokemon of pokemons) {
        const fetchedPokemon = await getPokemon(pokemon);

        // Can only give out attack moves for now.
        let moves = [];
        while (moves.length !== 4) {
            const random = Math.floor(
                1 + Math.random() * fetchedPokemon.moves.length,
            );
            const move = await getMove(random);
            if (move.damage_class.name !== "status" && move.power !== null) {
                moves.push(move);
            } else {
                continue;
            }
        }

        const idkMan = new Pokemon({
            name: fetchedPokemon.name,
            hp: fetchedPokemon.stats[0].base_stat,
            attack: fetchedPokemon.stats[1].base_stat,
            defense: fetchedPokemon.stats[2].base_stat,
            spAttack: fetchedPokemon.stats[3].base_stat,
            spDefense: fetchedPokemon.stats[4].base_stat,
            speed: fetchedPokemon.stats[5].base_stat,
            type: fetchedPokemon.types.map((type) => type.type.name),
            moves: moves,
            frontSprite: fetchedPokemon.sprites.front_default,
            backSprite: fetchedPokemon.sprites.back_default,
        });

        players.push(idkMan);

        console.log(idkMan);
    }
};

const startBattle = async () => {
    await createPlayerStates();

    const preArena = document.querySelector(".preArena");
    preArena.remove();
    console.log(players);

    RenderArena(players, playerTurn, chosenMoves);
};


