const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "25px  'Roboto Mono'"
  
    },

    update: function (score) {
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Recogiendo esencia: "+Math.floor(score), 50, 50);
    }
};