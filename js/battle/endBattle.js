export const endBattle = (winner) => {
    const arena = document.querySelector(".arena");
    arena.innerHTML = "";
    alert(`${winner.name} won`)
}