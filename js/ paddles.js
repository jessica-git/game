class Paddle {
    constructor(ctx, x, y, width, height, color, gameW, gameH) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.gameW = gameW
        this.gameH = gameH

        this.posX = x;
        this.posY = y;
        this.posY0 = y
        this.color = color

        this.angle = 0
    }

    draw() {

        this.ctx.beginPath();
        this.ctx.fillStyle = "#5D6D7E"
        this.ctx.strokeStyle = "#0095DD";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.closePath();

    }

}