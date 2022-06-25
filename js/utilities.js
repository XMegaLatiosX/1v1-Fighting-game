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
        winner()
    }
}
function winner() {
    clearTimeout(timerId)
    if(player.hp == enemy.hp) {
        document.querySelector('.results').innerHTML = "tie!";
    }else if(player.hp > enemy.hp) {
        document.querySelector('.results').innerHTML = "Player1 Wins!";
    }else if(player.hp < enemy.hp) {
        document.querySelector('.results').innerHTML = "Player2 Wins!";
    }
    gameOver = true
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
