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
let removePlayerFromTeamBtn = document.getElementById('removePlayerFromTeamBtn')


//Event listeners to each list item
const assignEventListeners = (classes) => {
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

    assignEventListeners('#list li');

}


//Remove player from list
const removeSelectedPlayer = (arr, classes) => {
    const selectedPlayer = document.querySelector(classes);

    if (selectedPlayer) {
        const index = arr.indexOf(selectedPlayer.textContent);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        selectedPlayer.remove();
    } else {
        alert('Please select a player to remove');
    }
    console.log(arr)
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


//Assign player to a team
const assignSelectedPlayerToTeam = (arr, teamItem, teamName, opponentTeamArr, opponentTeamName) => {

    const selectedPlayer = document.querySelector('#list .player-selected');

    if (!selectedPlayer) {
        alert('Please select a player to assign');
        return;
    }

    if (arr.length >= 5) {
        alert(`Team: ${teamName} is full`)
        return;
    }
    const playerName = selectedPlayer.textContent;

    if (arr.includes(playerName)) {
        alert(`Player: ${playerName} has already assigned to this team`)
        return;
    }

    if (opponentTeamArr.includes(playerName)) {
        alert(`Player ${playerName} has already assigned to team ${opponentTeamName}`)
        return;
    }
    arr.push(playerName);
    teamItem.innerHTML += `<li>${playerName}</li>`
    selectedPlayer.classList.remove('player-selected');

    console.log(arr)
    assignEventListeners('.current-game-container li')
}

addPlayerBtn.addEventListener("click", addPlayer);
removePlayerBtn.addEventListener("click", () => { removeSelectedPlayer(playersList, '#list .player-selected') });

removePlayerFromTeamBtn.addEventListener("click", () => {
    const selectedPlayerInTeamA = document.querySelector('#teamA li.player-selected');

    if (selectedPlayerInTeamA) {
        removeSelectedPlayer(arrTeamA, '#teamA li.player-selected');
    } else {
        removeSelectedPlayer(arrTeamB, '#teamB li.player-selected');
    }
});

assignToTeamABtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamA, teamA, 'Team A', arrTeamB, 'Team B')
});
assignToTeamBBtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamB, teamB, 'Team B', arrTeamA, 'Team A')
});

