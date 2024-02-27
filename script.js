let playersList = [];
let playerInput = document.getElementById("player");
let addPlayerBtn = document.getElementById("addPlayerBtn");
let removePlayerBtn = document.getElementById("removePlayerBtn");
let list = document.getElementById("list");
let teamA = document.getElementById("teamA");
let teamB = document.getElementById("teamB");
let assignToATeamBtn = document.getElementById('assignToATeamBtn')


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

//Add player automatically
const autoAddPlayers = () => {
    let randomPlayer = `Player ${playersList.length + 1}`;
    if (Math.random() > 0.7) {
        playersList.push(randomPlayer);
        list.innerHTML += `<li>${randomPlayer}</li>`;
        assignEventListeners();
    }
}
setInterval(autoAddPlayers, 1000);


//Assign player to a team

let playersAssignedToTeamA = 0;
let playersAssignedToTeamB = 0;
const maxPlayersPerTeam = 5;

const assignSelectedPlayerToTeam = () => {

    const selectedPlayer = document.querySelector('#list .player-selected');

    if (!selectedPlayer) {
        alert('Please select a player to assign to a team');
        return;
    }

    if (playersAssignedToTeamA < maxPlayersPerTeam) {
        teamA.innerHTML += `<li>${selectedPlayer.textContent}</li>`;
        playersAssignedToTeamA++;
    } else if (playersAssignedToTeamB < maxPlayersPerTeam) {
        teamB.innerHTML += `<li>${selectedPlayer.textContent}</li>`;
        playersAssignedToTeamB++;
    } alert('Both teams have reached the maximum number of players')
}

assignToATeamBtn.addEventListener('click', assignSelectedPlayerToTeam);

