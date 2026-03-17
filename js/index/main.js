import { getPokemon } from "../api/getPokemon.js";

const cardsContainer = document.querySelector(".cards");

const shuffleTeam = async () => {
    try {
        const pokemonPromises = [];
        for (let i = 0; i < 8; i++) {
            const randomId = Math.floor(Math.random() * 151) + 1;
            pokemonPromises.push(getPokemon(randomId));
        }

        const team = await Promise.all(pokemonPromises);
        cardsContainer.innerHTML = "";

        team.forEach(pokemon => {
            const card = document.createElement("div");
            card.className = "card";

            const statsHTML = pokemon.stats
                .slice(0, 4) 
                .map(s => `<p>${s.stat.name}: ${s.base_stat}</p>`)
                .join("");

            card.innerHTML = `
                <h2 class="pokemon-name">${pokemon.name}</h2>
                <div class="image-container">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                <div class="stats-container">
                    ${statsHTML}
                </div>
            `;
            cardsContainer.append(card);
        });

    } catch (err) {
        console.error("Shuffle failed:", err);
    }
};

shuffleTeam();
setInterval(shuffleTeam, 5000);