//Selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".player1"),
selectOBtn = selectBox.querySelector(".player2"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //once window load
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        
    }

    selectXBtn.onclick = ()=> {
        selectBox.classList.add("hide"); //hide the select box on player1 button clicked
        playBoard.classList.add("show"); 
    }
    selectOBtn.onclick = ()=> {
        selectBox.classList.add("hide"); //hide the select box on player2 button clicked
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player"); 
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X"; //mặc định player 1
let runBot = true;

//user click function
function clickedBox(element) {
    //console.log(element);
    if(players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //đánh dấu tròn
        players.classList.add("active");
        //Nếu player chọn O thì đổi playerSign thành O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // đánh dấu nhân
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none"; // khi chọn xog người hơi ko thể chọn tiếp cho đến khi bot chọn xog
    element.style.pointerEvents = "none"; // Can't select selected box
    let randomDelayTime = ((Math.random()*1000)+200).toFixed(); //trì hoãn thời gian đánh dấu ngẫu nhiên
    
    setTimeout(() => {
        bot(runBot); // Gọi hàm bot
    }, randomDelayTime); //qua thời gian hoãn
}


//bot click function
function bot(runBot) {
    if(runBot) { //Nếu runBot là true thì chạy
        //thay đổi playerSign, nếu người chơi là X thì bot là O
        playerSign ="O";
        let array = []; // tạo mảng rỗng để lưu trữ ô đã chọn
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0) { // nếu chưa đc chọn
                array.push(i); // chèn ô chưa chọn vào mảng 
                //console.log(i+" "+ "has no children");
            }
            
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // chọn ô tự động
        if(array.length > 0) {
            if(players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // đánh dấu nhân
                players.classList.remove("active");
                // Nếu người chơi là O thì bot là X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //đánh dấu tròn
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X"; //đổi playerSign thành X
        // console.log(array);
    }
}

//Chọn người thắng
function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}
function checkClass(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign)
    {
        return true;
    }
}
function selectWinner() {
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)) {
        console.log(playerSign + " " + "is the winner");
        // Khi có người thằng thì dừng bot
        runBot = false;
        bot(runBot);
        setTimeout(()=> { // Delay show kết quả
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //700 ms delay

        if(playerSign =="X") {
            wonText.innerHTML = `Player <p>1</p> won the game!`;
        } else {
            wonText.innerHTML = `Player <p>2</p> won the game!`;
        }
    } else {
        //Nếu hòa
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(()=> { // Delay show kết quả
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); //700 ms delay

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = ()=> {
    window.location.reload(); // Load lại trang
}