const cell = document.querySelectorAll('.block');
const meassege = document.querySelector('.meassege');
const currentPlayer = document.querySelector('#curPlyr');
let player = 'x';

const winLayout = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

function cellClick() {

    var data = [];
    
    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        const meassegeText = 'Занято'
        meassege.classList.remove('visually-hidden');
        meassege.querySelector('.meassege-text').textContent = meassegeText;
        meassegeClose();
    }

    for (var i in cell){
        if (cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if (checkWin(data)) {
        setTimeout(function() {
            if (player == 'o') {
                player = 'x';
                restart("Выграл: " + player);
            } else {
                player = 'o';
                restart("Выграл: " + player);
            }
        }, 100)
    } else {
        var draw = true;
        for (var i in cell) {
            if(cell[i].innerHTML == '') draw = false;
        }
        if (draw) {
            const textMeassege = 'Ничья'
            setTimeout(function() {
                restart(textMeassege);
            }, 100)
        }
    }
    
    if (player == 'x') {
        player = 'o';
        currentPlayer.innerHTML = player.toUpperCase();
        return player;
    } else {
        player = 'x';
        currentPlayer.innerHTML = player.toUpperCase();
        return player;
    }

}

function restart(text) {
    meassege.querySelector('.meassege-text').textContent = text;
    meassege.classList.remove('visually-hidden');
    meassegeClose();
    player = 'x';
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
}

function checkWin(data) {
    for (var i in winLayout) {
        var win = true;
        for(var j in winLayout[i]) {
            var id = winLayout[i][j];
            var ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
};

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
};

const meassegeClose = () => {
    setTimeout(function(){
        meassege.classList.add('visually-hidden');
    }, 800);
};