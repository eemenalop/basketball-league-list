let playersList = [];
let playerInput = document.getElementById("player");
let addPlayerBtn = document.getElementById("addPlayerBtn");
let list = document.getElementById("list");

const addPlayer = () => {

    for (let i = 0; i < playersList.length; i++) {
        if (playerInput.value === playersList[i]) {
            return alert('Player already exists');
        }
    }

    if (playerInput.value === '') {
        return alert('Please insert a player');
    } else {
        playersList.push(playerInput.value.trim());
        list.innerHTML += `<li>${playerInput.value}</li>`;
        playerInput.value = "";
    }

}



addPlayerBtn.addEventListener("click", addPlayer);
