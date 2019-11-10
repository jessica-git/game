class Obstacle {
    constructor(ctx, width, height, posX, posY, url, score) {
        this.score = score;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image()
        this.image.src = url

        this.posX = posX;
        this.posY = posY;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }

    drawFill() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }


}