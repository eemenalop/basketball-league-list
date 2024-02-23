let playersList = [];
let playerInput = document.getElementById("player");
let addPlayerBtn = document.getElementById("addPlayerBtn");
let removePlayerBtn = document.getElementById("removePlayerBtn");
let list = document.getElementById("list");


//Event listeners to each list item
const assignEventListeners = () => {
    const listItems = document.querySelectorAll('#list li');
    listItems.forEach(player => {
        player.addEventListener("click", selectPlayer);
    });
}


//Add Player to list
const addPlayer = () => {

    let playerName = playerInput.value.trim();

    if (playersList.includes(playerName)) {
        alert('Player already exists');
        return;
    }

    if (playerInput.value === '') {
        alert('Please insert a player');
        return;
    }
    playersList.push(playerInput.value.trim());
    list.innerHTML += `<li>${playerInput.value}</li>`;
    playerInput.value = "";

    assignEventListeners();
}

//Highlight the player selected
const selectPlayer = (event) => {
    event.target.classList.toggle("player-selected");
}

//Remove player from list
const removeSelectedPlayer = () => {
    const selectedPlayer = document.querySelector('#list .player-selected');

    if (selectedPlayer) {
        const index = playersList.indexOf(selectedPlayer.textContent);
        if (index !== -1) {
            playersList.splice(index, 1);
        }
        selectedPlayer.remove();
    } else {
        alert('Please select a player to remove');
    }
}

removePlayerBtn.addEventListener("click", removeSelectedPlayer);
addPlayerBtn.addEventListener("click", addPlayer);

