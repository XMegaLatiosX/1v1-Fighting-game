//pega o canvas
const canvas    = document.querySelector('canvas');
const c         = canvas.getContext("2d");
const gravity   = 0.5;
let gameOver    = false
canvas.width    = 1024;
canvas.height   = 576;


const background = new Sprite({
    position:   {x: 0, y: 0}, 
    imgSrc:     "./assets/background.png"
})
const shop = new Sprite({
    position:   {x: 588, y: 128}, 
    imgSrc:     "./assets/shop.png",
    scale:      2.75,
    frames:     6
})

//criando uma classe pro player
const player = new Player({
    position:   {x: 50, y: canvas.height - 95 - 125},
    velocity:   {x:0, y:0},
    color:      "green",
    imgSrc:     "./assets/samuraiMack/Idle.png",
    frames:     8,
    scale:      2.5,
    offset:     {x: 210,y: 180},
    sprites: {
        idle:   {imgSrc:"./assets/samuraiMack/Idle.png", frames: 8},
        run:    {imgSrc:"./assets/samuraiMack/Run.png", frames: 8},
        atk1:   {imgSrc:"./assets/samuraiMack/Attack1.png", frames: 6},
        atk2:   {imgSrc:"./assets/samuraiMack/Attack2.png", frames: 6},
        death:  {imgSrc:"./assets/samuraiMack/Death.png", frames: 6},
        fall:   {imgSrc:"./assets/samuraiMack/Fall.png", frames: 2},
        jump:   {imgSrc:"./assets/samuraiMack/Jump.png", frames: 2},
        dmg:    {imgSrc:"./assets/samuraiMack/Take Hit - white silhouette.png", frames: 4}
    },
    atkBox:{
        offset: {x:50, y:-25, x2: 50, y2: 0},
        width: 200,
        height: 125,
        width2: 200,
        height2: 100
    },
    atkFrame: 5 & 6,
    name: 'player'
})

//criando uma classe pro player2
const enemy = new Player({
    position:   {x: canvas.width - 124 - 75, y: canvas.height - 95 - 175},
    velocity:   {x:0, y:0},
    color:      "red",
    imgSrc:     "./assets/kenji/Idle.png",
    frames:     4,
    scale:      2.5,
    offset:     {x: 210,y: 195},
    sprites:    {
        idle:   {imgSrc:"./assets/kenji/Idle.png", frames: 4},
        run:    {imgSrc:"./assets/kenji/Run.png", frames: 8},
        atk1:   {imgSrc:"./assets/kenji/Attack1.png", frames: 4},
        atk2:   {imgSrc:"./assets/kenji/Attack2.png", frames: 4},
        death:  {imgSrc:"./assets/kenji/Death.png", frames: 7},
        fall:   {imgSrc:"./assets/kenji/Fall.png", frames: 2},
        jump:   {imgSrc:"./assets/kenji/Jump.png", frames: 2},
        dmg:    {imgSrc:"./assets/kenji/Take hit.png", frames: 3}
    },
    atkBox:     {
        offset: {x:-140, y:-10, x2: -150, y2: -90},
        width: 150,
        height: 115,
        width2: 150,
        height2: 200
    },
    atkFrame: 2,
    name: 'enemy'
})

decreaseTime()

//---------------------------------------------------ANIMATE---------------------------------------------------//
function animate() {
    window.requestAnimationFrame(animate)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255, 0.125)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //movimentação do player
    player.velocity.x = 0
    if (key.d.pressed && player.lastKey == 'right') {
        player.velocity.x = 7.5
        player.switchSprite("run")
    }else if(key.a.pressed && player.lastKey == 'left') {
        player.velocity.x = -7.5
        player.switchSprite("run")
    }else player.switchSprite("idle")
    if(player.velocity.y < 0) {
        player.switchSprite("jump")
    }else if(player.velocity.y > 0) {
        player.switchSprite("fall")
    }
    
    //movimentação do player2
    enemy.velocity.x = 0
    if (key.aright.pressed && enemy.lastKey == 'right') {
        enemy.velocity.x = 7.5
        enemy.switchSprite("run")
    }else if(key.aleft.pressed && enemy.lastKey == 'left') {
        enemy.velocity.x = -7.5
        enemy.switchSprite("run")
    }else enemy.switchSprite("idle")
    if(enemy.velocity.y < 0) {
        enemy.switchSprite("jump")
    }else if(enemy.velocity.y > 0) {
        enemy.switchSprite("fall")
    }
    //ataque do player 1
    if(rectCollision({rect1: player, rect2: enemy, firstStrike: player.firstStrike}) && player.currentFrame == player.atkFrame) {
        player.isAttacking = false
        enemy.takeDmg()
    }
    //ataque do player 2
    if(rectCollision({rect1: enemy, rect2: player, firstStrike: player.firstStrike}) && enemy.currentFrame == enemy.atkFrame) {
        enemy.isAttacking = false
        player.takeDmg()
    }
    if(player.hp == 0 || enemy.hp == 0) {
        winner()
    }
}
//chama a função todo frame
animate()

