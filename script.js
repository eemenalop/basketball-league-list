export let playersList = [];
let list = document.getElementById("list");

//Event listeners to each list item
export const assignEventListeners = (classes) => {
    const listItems = document.querySelectorAll(classes);
    listItems.forEach(player => {
        player.addEventListener("click", selectPlayer);
    });
}

//Highlight the player selected
const selectPlayer = (event) => {
    const selectedPlayer = event.target

    document.querySelectorAll('#list .player-selected')
        .forEach(player => player.classList.remove('player-selected'));

    document.querySelectorAll('.current-game-container li')
      .forEach(player => player.classList.remove('player-selected'));

    selectedPlayer.classList.toggle("player-selected");

}

//Add player automatically
const autoAddPlayers = () => {
    let randomPlayer = `Player ${playersList.length + 1}`;
    if (Math.random() > 0.5) {
        playersList.push(randomPlayer);
        list.innerHTML += `<li>${randomPlayer}</li>`;
        assignEventListeners('#list li');
    }
}
setInterval(autoAddPlayers, 1000);


