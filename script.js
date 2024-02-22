let playersList = [];
let playerInput = document.getElementById("player");
let addPlayerBtn = document.getElementById("addPlayerBtn");
let removePlayerBtn = document.getElementById("removePlayerBtn");
let list = document.getElementById("list");


//Add Player to list
const addPlayer = () => {

    let playerName = playerInput.value.trim();

    if (playersList.includes(playerName)){
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
    

}

addPlayerBtn.addEventListener("click", addPlayer);
