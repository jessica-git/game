class ObstacleRandom {
    constructor(ctx, canvas, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image()
        this.image.src = "./img/manzana.png"

        this.score = 15

        this.posX = Math.floor(Math.random() * canvas.width)
        this.posY = Math.floor(Math.random() * (canvas.height - 100))
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}