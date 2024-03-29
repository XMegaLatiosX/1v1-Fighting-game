function rectCollision({rect1, rect2, firstStrike}) {
    //se o lado direito> do atk é maior q o lado esquerdo< do inimigo e
    //se o lado esquerdo do atk é menor q o lado direito do inimigo e
    //se o chão do atk é maior que a cabeça do inimigo e
    //se o topo do atk é menor que o pé do inimigo, retorna true
    if(firstStrike) {
        return (
            rect1.atkBox.position.x +  rect1.atkBox.width >= rect2.position.x &&
            rect1.atkBox.position.x <= rect2.position.x + rect2.width &&
            rect1.atkBox.position.y +  rect1.atkBox.height >= rect2.position.y &&
            rect1.atkBox.position.y <= rect2.position.y + rect2.height &&
            rect1.isAttacking
            )
    } else {
         return (
             rect1.atkBox.position.x +  rect1.atkBox.width2 >= rect2.position.x &&
             rect1.atkBox.position.x <= rect2.position.x + rect2.width &&
             rect1.atkBox.position.y +  rect1.atkBox.height2 >= rect2.position.y &&
             rect1.atkBox.position.y <= rect2.position.y + rect2.height &&
             rect1.isAttacking
             )
     }
}

let time = 61
let timerId
function decreaseTime() {
    timerId = setTimeout(decreaseTime, 1000)
    if(time  > 0){
        time-- 
        document.querySelector(".timer").innerHTML = time
    }
    if(time === 0){
        winner();
    }
}

function start() {
    started = true
    joj = false
    decreaseTime()
    document.querySelector('.startBtn').style = "display: none;"
    player.position = {x: 50, y: canvas.height - 95 - 125}
    enemy.position = {x: canvas.width - 124 - 75, y: canvas.height - 95 - 125}
}
function restart() {
    document.querySelector('.restartBtn').style = "display: none"
    joj = true
    document.querySelector('.txtShadow').style.animation = "low-font-size .1s reverse 1"
    document.querySelector('.results').style.animation = "low-font-size .1s reverse 1"
    setTimeout(()=> {
        document.querySelector('.displayBg').style.animation = "reverseslide 1s reverse 1"
        setTimeout(() => {
            document.querySelector('.displayBg').style = "height: 40px; background: linear-gradient(to bottom, black, rgb(89, 138, 170) 50%, black 100%);position: absolute; display: flex; align-items: center; justify-content: center; left: 100%; right: 0;"
            sla = false
        }, 975)
        document.querySelector('.results').style = "font-size: 0px"
        document.querySelector('.txtShadow').style = "font-size: 0px"
    }, 101)
    player.currentHp = 100
    enemy.currentHp = 100
    player.dead = false
    enemy.dead = false
    time = 61
    started = false
    gameOver = false
    setTimeout(countDown, 1100);
}

let times = 0
function countDown() {
    document.querySelector('.cd').style = "display: block"
    setTimeout(() => {
        document.querySelector('.cd').innerHTML = "2"
    }, 1000);
    setTimeout(() => {
        document.querySelector('.cd').innerHTML = "1"
    }, 2000);
    setTimeout(() => {
        decreaseTime()
        document.querySelector('.cd').innerHTML = "GO!"
        player.position = {x: 50, y: canvas.height - 95 - 125}
        enemy.position = {x: canvas.width - 124 - 75, y: canvas.height - 95 - 125}
        started = true
        joj = false
    }, 2999);
    document.querySelector('.cd').addEventListener('animationend', () => {
        document.querySelector('.cd').style = "font-size: 0px"
        document.querySelector('.cd').innerHTML = "3"
    })
}

let Winner
function winner() {
    if(!gameOver) {
        clearTimeout(timerId)
        if(player.hp == enemy.hp) {
            Winner = "tie!";
        }else if(player.hp > enemy.hp) {
            Winner = "Samurai Mack Wins!";
        }else if(player.hp < enemy.hp) {
            Winner = "Kenji Wins!"
        }
    }
    document.querySelector('.displayBg').style.animation = "slide 1s cubic-bezier(0.6, 0.5, 0, 1) 1";
    document.querySelector('.displayBg').addEventListener("animationend", playTxtAnim);
    if(!joj) gameOver = true

}
let sla = false
function playTxtAnim() {if(sla) return
    sla = true
    document.querySelector('.restartBtn').style = "display: inline-block"
    console.log("cabo // "+gameOver)
    document.querySelector('.results').innerHTML = Winner
    document.querySelector('.txtShadow').innerHTML = Winner
    document.querySelector('.results').style.animation = "high-font-size 1s cubic-bezier(0, 1, 1, 1) 1, shiny 5s linear infinite"
    document.querySelector('.txtShadow').style.animation = "high-font-size 1s cubic-bezier(0, 1, 1, 1) 1"
    document.querySelector('.results').style.fontSize = "var(--fontSize)"
    document.querySelector('.txtShadow').style.fontSize = "var(--fontSize)"
    document.querySelector('.displayBg').style.left = "0%"
    document.querySelector('.displayBg').style.height = "40px"
}

const key = {
    //variaveis pra informar quando uma tecla está sendo apertada
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},

    aleft: {pressed: false},
    aright: {pressed: false},
    aup: {pressed: false},
}

//detecta quando alguma tecla é apertada
window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    if(!gameOver){
        switch (event.key) {
            case 'd':
                key.d.pressed = true
                player.lastKey = 'right'
                break;
            case 'a':
                key.a.pressed = true
                player.lastKey = 'left'
                break;
            case 'w':
                player.velocity.y = -15
                break;
            case 'D':
                key.d.pressed = true
                player.lastKey = 'right'
                break;
            case 'A':
                key.a.pressed = true
                player.lastKey = 'left'
                break;
            case 'W':
                player.velocity.y = -15
                break;
            case ' ':
                player.atack()
                break;


            case 'ArrowRight':
                key.aright.pressed = true
                enemy.lastKey = 'right'
                break;
            case 'ArrowLeft':
                key.aleft.pressed = true
                enemy.lastKey = 'left'
                break;
            case 'ArrowUp':
                enemy.velocity.y = -15
                break;
            case 'Enter':
                enemy.atack()
                break;
        }
    }
})

//detecta quando alguma tecla é solta
window.addEventListener('keyup', (event) => {
    if(!gameOver) {
        switch (event.key) {
            case 'd':
                key.d.pressed = false
                break;
            case 'a':
                key.a.pressed = false
                break;
            case 'D':
                key.d.pressed = false
                break;
            case 'A':
                key.a.pressed = false
                break;


            case 'ArrowRight':
                key.aright.pressed = false
                break;
            case 'ArrowLeft':
                key.aleft.pressed = false
                break;
        }
    }
})
