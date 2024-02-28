let playersList = [];
let playerInput = document.getElementById("player");
let addPlayerBtn = document.getElementById("addPlayerBtn");
let removePlayerBtn = document.getElementById("removePlayerBtn");
let list = document.getElementById("list");
let teamA = document.getElementById("teamA");
let arrTeamA = [];
let teamB = document.getElementById("teamB");
let arrTeamB = [];
let assignToTeamABtn = document.getElementById('assignToTeamABtn')
let assignToTeamBBtn = document.getElementById('assignToTeamBBtn')


//Event listeners to each list item
const assignEventListeners = () => {
    const listItems = document.querySelectorAll('#list li');
    listItems.forEach(player => {
        player.addEventListener("click", selectPlayer);
    });
}

//Highlight the player selected
const selectPlayer = (event) => {
    const selectedPlayer = event.target

    document.querySelectorAll('#list .player-selected')
        .forEach(player => player.classList.remove('player-selected'));

    selectedPlayer.classList.toggle("player-selected");

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


//Add player automatically
const autoAddPlayers = () => {
    let randomPlayer = `Player ${playersList.length + 1}`;
    if (Math.random() > 0.5) {
        playersList.push(randomPlayer);
        list.innerHTML += `<li>${randomPlayer}</li>`;
        assignEventListeners();
    }
}
setInterval(autoAddPlayers, 1000);


//Assign player to a team
const assignSelectedPlayerToTeam = (arr, team) => {

    const selectedPlayer = document.querySelector('#list .player-selected');

    if (!selectedPlayer) {
        alert('Please select a player to assign');
        return;
    }

    if (arr.length >= 5) {
        alert(`Team: ${team} is full`)
        return;
    }
    const playerName = selectedPlayer.textContent;
    if (arr.includes(playerName)) {
        alert(`Player: ${playerName} already assigned to team ${team}`)
        return;
    }


    arr.push(playerName);
    selectedPlayer.classList.remove('player-selected');

    console.log(arr)
}

addPlayerBtn.addEventListener("click", addPlayer);
removePlayerBtn.addEventListener("click", removeSelectedPlayer);
assignToTeamABtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamA, 'Team A')
});
assignToTeamBBtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamB, 'Team B')
});

