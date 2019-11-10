class Ball {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.ballRadius = 15

        this.image = new Image()
        this.image.src = "./img/mosca yonki-01.png"
        
        this.posXOpt = [70, 120, 200, 430, 490]
        let posXRandom = Math.floor(Math.random()*(5 - 0) + 0)
        this.X = this.posXOpt[posXRandom]
        
        this.vx = 20
        this.vy = 20
        
        this.width = 80
        this.height = 80
        this.gravity = .45
        this.rebote = -1

        this.Y = 560 - this.height
    }


    draw() {
    
        this.ctx.drawImage(this.image, this.X, this.Y, this.width, this.height)

    }

    move() {

        
        // if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        //     dx = -dx;
        // }
        // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        //     dy = -dy;
        // }
        
        // x += dx;
        // y += dy;

        console.log(`${this.X} esta es la pelota`)
        this.vy += this.gravity
        this.X += this.vx
        this.Y += this.vy

    }
}  
    