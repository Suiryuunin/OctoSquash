class Word {

    constructor(setting, x, y, offsetX, border, words, size, margin) {

        this.setting = setting;
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.border = border;
        this.words = words;
        this.size = size;
        this.margin = margin;

    }

    updatePos() {

        display.createWord(display.settings, this.setting, this.x, this.y, this.offsetX, this.border, this.words, this.size, 1, "white", "MisterPixel", this.margin);

    }

}