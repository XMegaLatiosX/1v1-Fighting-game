//criando CLASSE,
class Sprite {
    //variaveis da classe e parametos quando criada.
    constructor({position, imgSrc, scale = 1, frames = 1, offset = {x: 0,y: 0}}) {
        this.position = position
        this.height = 175
        this.width = 75
        this.image = new Image()
        this.image.src = imgSrc
        this.totalFrames = frames
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 7
        this.scale = scale
        this.image.height
        this.image.width
        this.offset = offset
    }

    draw() {
        //c.fillStyle = this.color //HURT BOXES*
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(
            this.image,
            this.image.width / this.totalFrames * this.currentFrame,
            0,
            this.image.width / this.totalFrames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width / this.totalFrames * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0) {
            if(this.currentFrame < this.totalFrames - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }

    update() {
        this.draw()

        this.animateFrames()
    }
}

class Player extends Sprite{
    //variaveis da classe e parametos quando criada.
    constructor({
        position,
        velocity,
        color,
        lastKey,
        imgSrc,
        scale = 1,
        frames = 1,
        offset = {x: 0,y: 0},
        sprites,
        atkBox = {offset: {}, width: 0, height: 0, width2: 0, height2: 0},
        atkFrame,
        name
    }) {
        super({
            position,
            imgSrc,
            scale,
            frames,
            offset
        })
        this.velocity   = velocity
        this.height     = 125
        this.width      = 75
        this.color      = color
        this.atkBox     = {
            position:   {
                x: this.position.x,
                y: this.position.y,
            },
            offset:     atkBox.offset,
            width:      atkBox.width,
            height:     atkBox.height,
            width2:      atkBox.width2,
            height2:     atkBox.height2
        }
        this.isAttacking= false  
        this.lastKey    = lastKey
        this.currentHp = 100
        this.hp         = 100
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 7
        this.sprites = sprites
        this.firstStrike = true
        this.atkFrame = atkFrame
        this.name = name
        this.dead = false


        for(const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
    }

    update() {
        if(this.hp > this.currentHp) {
            this.hp--
            document.querySelector("#" + this.name + "Hp").style.width = this.hp + '%'
        }else if(this.hp < this.currentHp) {
            this.hp++
            document.querySelector("#" + this.name + "Hp").style.width = this.hp + '%'
        }

        if(!this.dead) {
            this.animateFrames()
        }
        this.draw()
        //c.fillStyle = "black"
        if(this.firstStrike) {
            this.atkBox.position.x = this.position.x + this.atkBox.offset.x
            this.atkBox.position.y = this.position.y + this.atkBox.offset.y
            //c.fillRect(this.atkBox.position.x, this.atkBox.position.y, this.atkBox.width, this.atkBox.height)
        } else {
            this.atkBox.position.x = this.position.x + this.atkBox.offset.x2
            this.atkBox.position.y = this.position.y + this.atkBox.offset.y2
            //c.fillRect(this.atkBox.position.x, this.atkBox.position.y, this.atkBox.width2, this.atkBox.height2)
        }


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //impede players de cairem do chão
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0
            this.position.y = 356
        } else this.velocity.y += gravity
        if(this.currentFrame > this.atkFrame) this.isAttacking = false
    }
    atack() {
        if(this.firstStrike) {
            this.switchSprite('atk1')
            this.firstStrike = false
        }else {
            this.switchSprite('atk2')
            this.firstStrike = true
        }
        this.isAttacking = true
    }

    takeDmg() {
        if(started) this.currentHp -= 10
        if(this.currentHp <= 0 && !gameOver) {
            this.switchSprite("death")
            winner();
        }else {
            this.switchSprite("dmg")
    }
    }

    switchSprite(sprite) {
        if(this.image === this.sprites.atk1.image &&
        this.currentFrame < this.sprites.atk1.frames -1) {return} else
        if(this.image === this.sprites.atk2.image &&
        this.currentFrame < this.sprites.atk2.frames -1) {return} else
        if(this.image === this.sprites.dmg.image &&
        this.currentFrame < this.sprites.dmg.frames -1) {return} else
        if(this.image === this.sprites.death.image && joj == false) {
            if(this.currentFrame === this.sprites.death.frames -1) {
                this.dead = true
            }
            return
        }
        switch (sprite) {
            case 'idle': 
                if(this.image !== this.sprites.idle.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.idle.frames
                    this.image = this.sprites.idle.image
                    this.framesHold = 7}
                break

            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.run.frames
                    this.image = this.sprites.run.image
                    this.framesHold = 6}
                break

            case 'atk1':
                if(this.image !== this.sprites.atk1.image) {
                    this.framesHold = 4
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.atk1.frames
                    this.image = this.sprites.atk1.image}
                break

            case 'atk2':
                if(this.image !== this.sprites.atk2.image) {
                    this.framesHold = 4
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.atk2.frames
                    this.image = this.sprites.atk2.image}
                break

            case 'death':
                if(this.image !== this.sprites.death.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.death.frames
                    this.image = this.sprites.death.image
                    this.framesHold = 10}
                break

            // case 'death':
            //     if(this.image !== this.sprites.death.image) {
            //         this.currentFrame = 0
            //         this.totalFrames = this.sprites.death.frames
            //         this.image = this.sprites.death.image
            //         this.framesHold = 10}
            //     break

            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.fall.frames
                    this.image = this.sprites.fall.image
                    this.framesHold = 100}
                break

            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.jump.frames
                    this.image = this.sprites.jump.image
                    this.framesHold = 100}
                break

            case 'dmg':
                if(this.image !== this.sprites.dmg.image) {
                    this.currentFrame = 0
                    this.totalFrames = this.sprites.dmg.frames
                    this.image = this.sprites.dmg.image
                    this.framesHold = 4}
                break
         
        }
    }
}
