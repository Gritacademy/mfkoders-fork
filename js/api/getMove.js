const apiURL = "https://pokeapi.co/api/v2/"

// Fetches move

export const getMove = async(move) => {
    try {
        const response = await fetch(`${apiURL}/move/${move}`);

        if(!response.ok) throw new Error("Failed to fetch move");

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}
