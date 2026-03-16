import {RenderArena} from "./RenderArena.js";
import {calculateTypeDamageMultiplier} from "./typeDamageMultiplier.js";
import { endBattle } from "./endBattle.js";



export const resolveTurn = async (players, chosenMoves) => {

    const checkGameOver = (defender, attacker) => {
        if(defender.hp <= 0){
            endBattle(attacker)
        }
    }   

    let player1 = players[0];
    let player2 = players[1];

    // Kollar vem som ska attackera först beroende på speed
    let attackOrder = [];
    if (player1.speed > player2.speed) {
        attackOrder.push(player1, player2);
    } else {
        attackOrder.push(player2, player1);
    }

    const calculateDamage = (attacker, defender, move) => {
        //Göra denna dynamisk sen om du vill implementera
        let pokemonLevel = 1;
        let base = 0;

        console.log(attacker);
        console.log(defender);
        if (move.damage_class === "physical") {
            base =
                (((2 * pokemonLevel) / 5 + 2) * move.power * attacker.attack) /
                    defender.defense /
                    50 +
                2;
        } else {
            base =
                (((2 * pokemonLevel) / 5 + 2) *
                    move.power *
                    attacker.spAttack) /
                    defender.spDefense /
                    50 +
                2;
        }

        const damageTypeMultiplier = calculateTypeDamageMultiplier(
            attacker.type,
            move.type.name,
            defender.type,
        );

        base * damageTypeMultiplier;

        //Rolls if attack should crit
        //Måste uppdateras
        const roll = Math.floor(Math.random() * 24);
        console.log(roll);
        if (roll === 15) {
            console.log(`Attack critted for ${base * 1.5} instead of ${base}`);
            base * 1.5;
        }

        return Math.floor(base);
    };

    attackOrder.forEach((attacker) => {
        let defender = players.find((p) => p !== attacker);

        let chosenMove = players.indexOf(attacker);
        let move = chosenMoves[chosenMove];

        const damage = calculateDamage(attacker, defender, move);

        defender.takeDamage(damage);
        checkGameOver(defender, attacker)
    });

    chosenMoves = [];
    attackOrder = [];

    // alert("Its battling time");
    RenderArena(players, 0, chosenMoves);
};
