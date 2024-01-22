class Display {

    "use strict";

    constructor(canvas, imgs) {

        this.display = canvas.getContext("2d");
        this.backdrop = document.createElement("canvas").getContext("2d");
        this.buffer = document.createElement("canvas").getContext("2d");
        this.settings = document.createElement("canvas").getContext("2d");
        this.input = "";
        this.color = "black";
        this.alpha = 0.01;
        this.imgs = [];

        for (let i = 0; i < imgs.length; i++) {

            this.imgs[i] = new Image();
            this.imgs[i].src = imgs[i];

        }

    }

    drawBackground(ctx, color = "white", alpha = 1) {

        ctx.globalAlpha  = alpha;

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    }

    createWord(ctx, word, x, y, offsetX = 0, border = true, words = 1, size = 16, alpha, color = this.color, font = "MisterPixel", margin = 14, width = 1) {

        ctx.imageSmoothingEnabled = false;


        ctx.globalAlpha  = alpha;
        ctx.lineWidth = width;

        ctx.font = `${size}px ${font}`;
        this.widths = [];
        if (words > 1) {

            for (let i = 0; i < words; i++) {

                this.widths[i] = ctx.measureText(word[i])["width"];

            }

            this.width = Math.max(...this.widths);

        } else
            this.width = ctx.measureText(word)["width"];

        if (offsetX != 0)
            x += Math.floor(this.width * offsetX);

        if (border) {

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.rect(x, y, this.width + 8, size * words);
            ctx.stroke();

        }
        
        
        ctx.fillStyle = color;
        if (words > 1) {

            for (let i = 0; i < words; i++) {

                ctx.fillText(word[i], x + 5, (i + 1) * margin + y, this.width + 4);

            }

        } else
            ctx.fillText(word, x + 5, y + size - 2 * Math.floor(size / 16), this.width + 4);

        ctx.globalAlpha = 1;
    }

    drawObject(ctx, img, sheetX, sheetY, x, y, width, height, multiplier = 1, blur = false) {

        ctx.imageSmoothingEnabled = blur;
        
        ctx.drawImage(img, sheetX, sheetY, width, height, x, y, width * multiplier, height * multiplier);

    }

    createRect(ctx, x, y, width, height, color = this.color, thickness = 1, alpha = 1) {

        ctx.globalAlpha = alpha;
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.globalAlpha = 1;

    }

    createFill(ctx, x, y, width, height, color = this.color, alpha = 1) {

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width,height);
        ctx.globalAlpha = 1;

    }

    resize(width, height, ratio) {

        if (height / width > ratio) {

            this.display.canvas.height = width * ratio - 20;
            this.display.canvas.width = width - 20;
            
        } else {

            this.display.canvas.height = height - 20;
            this.display.canvas.width = height / ratio - 20;

        }
        this.render();

    }

    render() {

        this.display.imageSmoothingEnabled = this.antiAlisasing;


        this.display.drawImage(this.backdrop.canvas,
            0, 0,
            this.backdrop.canvas.width, this.backdrop.canvas.height,
            0, 0,
            this.display.canvas.width, this.display.canvas.height);


        this.display.drawImage(this.buffer.canvas,
            0, 0,
            this.buffer.canvas.width, this.buffer.canvas.height,
            Math.floor(this.display.canvas.width * 0.1), Math.floor(this.display.canvas.height * 0.1),
            this.display.canvas.width - 2 * Math.floor(this.display.canvas.width * 0.1), this.display.canvas.height - 2 * Math.floor(this.display.canvas.height * 0.1));
            

        for (let i = 0; i < 7; i++) {

            if (Math.floor(gameState) == 0)
                if (this.alpha < 1)
                    this.alpha += 0.01;
               
            if (Math.floor(gameState) == 1)
                if (this.alpha > 0.01)
                    this.alpha -= 0.01;

        }


        this.display.globalAlpha = this.alpha;
        
        this.display.drawImage(
            this.settings.canvas,
            0, 0,
            this.settings.canvas.width, this.settings.canvas.height,
            Math.floor(this.display.canvas.width / 10), Math.floor(this.display.canvas.height / 10),
            Math.ceil(this.display.canvas.width * 8 / 10) + 1, Math.ceil(this.display.canvas.height * 8 / 10) + 1);

        this.display.globalAlpha = 1;
        this.color = this.brightness <= 25 ? "white" : "black";
        
        document.querySelector("body").style.backgroundColor = `hsl(0, 0%, ${this.brightness}%)`;
        
        
    }

}