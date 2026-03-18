import { resolveTurn } from "./resolveTurn.js";

export const RenderArena = (players, whosTurn, chosenMoves) => {
    if (document.querySelector(".arena")) {
        document.querySelector(".arena").remove();
    }

    const ArenaDiv = document.createElement("div");
    ArenaDiv.className = "arena";

    const TopContainer = document.createElement("div");
    TopContainer.className = "top-container";

    const BottomContainer = document.createElement("div");
    BottomContainer.className = "bottom-container";

    const MoveContainer = document.createElement("div");
    MoveContainer.className = "move-container";

    ArenaDiv.append(TopContainer, BottomContainer, MoveContainer);

    const body = document.querySelector("body");
    body.appendChild(ArenaDiv);

    let count = 0;
    players.forEach((player) => {
        const TopContainer = document.querySelector(".top-container");
        const BottomContainer = document.querySelector(".bottom-container");

        const playerDiv = document.createElement("div");
        playerDiv.className = "playerDiv";

        const playerSprite = document.createElement("img");
        playerSprite.id = "pokemon" + count;
        count++;
        const playerTurnName = document.createElement("p");
        playerTurnName.textContent = player.name;

        const playerTurnHP = document.createElement("p");
        playerTurnHP.textContent = "HP: " + player.hp;

        playerDiv.append(playerSprite, playerTurnName, playerTurnHP);

        if (players[whosTurn] === player) {
            console.log(`It is now player ${player.name}'s turn`);
            playerSprite.src = player.backSprite;
            BottomContainer.appendChild(playerDiv);

            player.moves.forEach((move) => {
                const moveContainer = document.querySelector(".move-container");
                const moveButton = document.createElement("button");

                moveButton.addEventListener("click", () => {
                    chosenMoves[whosTurn] = move;

                    player.decreasePP(move);

                    console.log(chosenMoves);
                    whosTurn++;
                    RenderArena(players, whosTurn, chosenMoves);

                    if (whosTurn > 1) {
                        whosTurn = 0;
                        resolveTurn(players, chosenMoves);
                    }
                });

                moveButton.textContent = `${move.name} | PP:${move.pp} | ${move.type.name} | Power: ${move.power}`;
                moveContainer.appendChild(moveButton);
            });
        } else {
            console.log(`It is NOT player ${player.name}'s turn`);
            playerSprite.src = player.frontSprite;
            TopContainer.appendChild(playerDiv);
        }
    });
};
