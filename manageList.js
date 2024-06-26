import { playersList, assignEventListeners } from "./script.js"


let addPlayerBtn = document.getElementById("addPlayerBtn");
let playerInput = document.getElementById("player");
let removePlayerBtn = document.getElementById("removePlayerBtn");
let teamA = document.getElementById("teamA");
let arrTeamA = [];
let teamB = document.getElementById("teamB");
let arrTeamB = [];
let assignToTeamABtn = document.getElementById('assignToTeamABtn')
let assignToTeamBBtn = document.getElementById('assignToTeamBBtn')
let removePlayerFromTeamBtn = document.getElementById('removePlayerFromTeamBtn')
let winnerTeamBtn = document.getElementById('winner-team-btn')

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
addPlayerBtn.addEventListener("click", addPlayer);

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

removePlayerBtn.addEventListener("click", () => { removeSelectedPlayer(playersList, '#list .selected') });

//Assign player to a team
const assignSelectedPlayerToTeam = (arr, teamItem, teamName, opponentTeamArr, opponentTeamName) => {

    const selectedPlayer = document.querySelector('#list .selected');

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

    if (playersList.indexOf(playerName) > 9) {
        alert('Only the first 10 players can be added to Team A or Team B')
        return;
    }
    arr.push(playerName);
    teamItem.innerHTML += `<li>${playerName}</li>`
    selectedPlayer.classList.remove('.selected');

    console.log(arr)
    assignEventListeners('.current-game-container li')
}

//Remove player from a team
removePlayerFromTeamBtn.addEventListener("click", () => {
    const selectedPlayerInTeamA = document.querySelector('#teamA li.selected');

    if (selectedPlayerInTeamA) {
        removeSelectedPlayer(arrTeamA, '#teamA li.selected');
    } else {
        removeSelectedPlayer(arrTeamB, '#teamB li.selected');
    }
});

assignToTeamABtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamA, teamA, 'Team A', arrTeamB, 'Team B')
});
assignToTeamBBtn.addEventListener('click', () => {
    assignSelectedPlayerToTeam(arrTeamB, teamB, 'Team B', arrTeamA, 'Team A')
});

// Select a winner team
let winnerSelected = false;

const winnerTeam = () => {

    const selectedTeam = document.querySelector('.current-game-container ol.selected');
    const nextPlayers = [];

    if (!selectedTeam) {
        alert('Seleccione un equipo ganador')
        return;
    }

    if (winnerSelected) {
        alert('Ya se ha seleccionado un equipo ganador')
        return;
    }

    if (selectedTeam) {
        const listItems = document.querySelectorAll('#list li');
        const selectedPlayers = Array.from(selectedTeam.querySelectorAll('li')).map(li => li.textContent);

        listItems.forEach((li, index) => {
            if (selectedPlayers.includes(li.textContent)) {
                nextPlayers.push(li.textContent);
            }
        });


        /*const liElements = selectedTeam.querySelectorAll('li')
        
        liElements.forEach(li => {
            nextPlayers.push(li.textContent)
        })*/
        if (nextPlayers.length !== 5) {
            alert('Debe haber 5 jugadores en el equipo ganador')
            return;
        }
    }
    const confirmation = confirm('Estas seguro de que el equipo seleccionado ha ganado?')

    if (confirmation) {
        winnerSelected = true;
        nextPlayers.sort((a, b) => a.index - b.index);
        nextPlayers.forEach(player => {
            nextPlayers.push(player.player)
        })
    } else {
        selectedTeam.classList.remove('selected')
    }
    console.log(`Proximos jugadores: ${nextPlayers}`)
};
assignEventListeners('.current-game-container ol')
winnerTeamBtn.addEventListener('click', winnerTeam)
