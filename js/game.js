const Game = {
    title: "Pinball",
    author: "Jessica",
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    obstacles: [],
    originalPaddles: [],
    paddles: [],
    obstaclesRandom: [],
    framesCounter: 0,
    fps: 60,
    score: undefined,
    keys: {
        LEFT: 37,
        RIGHT: 39
    },
    movingPaddles: {
        right: false,
        left: false
    },

    init() {
        //inicializar renderizando el canvas y su contexto
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext('2d')

        // damos valores a las medidas del canvas
        this.canvas.width = window.innerWidth / 2
        this.canvas.height = window.innerHeight
        this.setEventListeners()
        this.start()
    },


    start() {
        this.reset()
        this.generateObstaclesFixed()
        this.generatePaddles()

        this.interval = setInterval(() => {
            this.generateObstaclesRandom()

            this.drawAll()
            let collisionObstacles = this.isCollision(this.obstacles)
            let collisionObsRandom = this.isCollision(this.obstaclesRandom)

            this.isCollisionBox();

            if (collisionObstacles.length > 0) {
                this.rebound(this.musicOh())
                this.addScores(collisionObstacles)
            }
            if (this.isCollision(this.paddles).length > 0) {
                this.rebound()
            }
            if (collisionObsRandom.length > 0) {
                this.addScores(collisionObsRandom)
                this.clearObstaclesRandom()
            }

            this.drawScore()
            this.moveAll()
            this.musicPlayer()
            this.framesCounter += 1
        }, 1000 / this.fps)
    },

    
    reset() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height)
        this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height)
        // this.ball.Y = this.canvas.height - this.ball.ballRadius
        // this.ball.X = this.canvas.width - this.ball.ballRadius
        this.ball.vy = -20 - (Math.random() * 5)
        this.ball.vx = -1.5

        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;


    },

    drawAll() {
        
        this.background.draw()
       
        this.obstacles.forEach(obs => obs.draw())
        this.paddles.forEach(paddle => paddle.draw())
        this.ball.draw()
        this.obstaclesRandom.forEach(obsRandom => obsRandom.draw())
    },

    moveAll() {
        this.ball.move()

        if (this.movingPaddles.right) {
            this.paddles[0].posY = this.originalPaddles[0].posY - 50
        } else {
            this.paddles[0].posY = this.originalPaddles[0].posY
        }
        if (this.movingPaddles.left) {
            this.paddles[1].posY = this.originalPaddles[1].posY - 50
        } else {
            this.paddles[1].posY = this.originalPaddles[1].posY
        }


    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },


    generateObstaclesFixed() {
        this.obstacles.push(new Obstacle(this.ctx, 55, 55, (this.canvas.width / 4) - 65 / 2, this.canvas.height / 7.5, "./img/caca.png", 5))
        this.obstacles.push(new Obstacle(this.ctx, 55, 55, (this.canvas.width / 4 * 3) - 65 / 2, this.canvas.height / 7.5, "./img/caca.png", 1))
        this.obstacles.push(new Obstacle(this.ctx, 55, 55, (this.canvas.width / 3) - 65 / 2, (this.canvas.height / 7.5) + 110, "./img/caca.png", 10))
        this.obstacles.push(new Obstacle(this.ctx, 55, 55, (this.canvas.width / 3 * 2) - 65 / 2, (this.canvas.height / 7.5) + 110, "./img/caca.png", 30))
        this.obstacles.push(new Obstacle(this.ctx, 55, 55, (this.canvas.width / 2) - 65 / 2, this.canvas.height / 2, "./img/flor.png", -100))
    },


    generatePaddles() {
        this.originalPaddles.push(new Paddle(this.ctx, 390, 560, 150, 20, "white", this.canvas.width, this.canvas.height))
        this.originalPaddles.push(new Paddle(this.ctx, 100, 560, 150, 20, "white", this.canvas.width, this.canvas.height))
        this.paddles.push(new Paddle(this.ctx, 390, 560, 220, 50, "white", this.canvas.width, this.canvas.height))
        this.paddles.push(new Paddle(this.ctx, 60, 560, 220, 50, "white", this.canvas.width, this.canvas.height))

    },

    generateObstaclesRandom() {
        if (this.framesCounter % 100 == 0) {
            this.clearObstaclesRandom()
            this.obstaclesRandom.push(new ObstacleRandom(this.ctx, this.canvas, 40, 40))
        }
    },

    clearObstaclesRandom() {
        this.obstaclesRandom = []
    },

    isCollisionBox() {
        if (this.ball.X > this.canvas.width - this.ball.ballRadius) {
            this.ball.X = this.canvas.width - this.ball.ballRadius
            this.ball.vx *= this.ball.rebote
        } else if (this.ball.X < this.ball.ballRadius) {
            this.ball.X = this.ball.ballRadius
            this.ball.vx *= this.ball.rebote
        }

        if (this.ball.Y > this.canvas.height) {
            
            
            this.gameOver()
        } else if (this.ball.Y < this.ball.ballRadius) {
            this.ball.Y = this.ball.ballRadius
            this.ball.vy *= this.ball.rebote

        }
    },

    isCollision(obstacles) {
        return obstacles.filter(
            obs =>
                this.ball.Y + this.ball.ballRadius > obs.posY -15 &&   //TOP
                this.ball.Y - 15 < obs.posY + obs.height &&        //BOTTOM
                this.ball.X + this.ball.ballRadius > obs.posX -15 &&   //RIGTH
                this.ball.X -15 < obs.posX + obs.width                 //LEFT
        )
        
    },

    rebound() {
        this.ball.vy = this.ball.vy * -1
    },

    addScores(obstacles) {
        obstacles.forEach(obs => this.score += obs.score);
    },


    drawScore() {
        this.scoreboard.update(this.score);
    },
    gameOver() {
        
        this.image = new Image()
        this.image.src = "./img/gameover.png"
        this.ctx.drawImage(this.image, 100, 200, 450, 250)

        this.musicPlayerStop()
        this.musicGameover()
    },

    setEventListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this.keys.SPACE:
                    // this.ball.move = true
                    break
                case this.keys.LEFT:
                    this.movingPaddles.left = true
                    break
                case this.keys.RIGHT:
                    this.movingPaddles.right = true
                    break
            }
        }

        document.onkeyup = e => {
            switch (e.keyCode) {
                case this.keys.LEFT:
                    this.movingPaddles.left = false
                    break
                case this.keys.RIGHT:
                    this.movingPaddles.right = false
                    break
            }
        }
    },

    //audios
    musicPlayer(){
        this.mosca = document.getElementById("mosca").play()
    },
    musicPlayerStop() {
        this.mosca = document.getElementById("mosca").remove()
    },
    musicOh(){
        this.ohoh = document.getElementById("ohoh").play()
    },
    musicGameover(){
        this.over = document.getElementById("gameover").play()
    }

}

