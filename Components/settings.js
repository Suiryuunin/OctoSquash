class Settings {

    constructor() {

        this.health = 10;
        this.max = 100;

    }
    
    modify(health, max) {
      
        if (this.health != health || this.max != max) {
          
            this.health = health;
            this.max = max;
            setup(false);
            return;
          
        }
      
    }

}

class Slider {

  constructor(setting, x, y, width, height, display, value = 0, minMax, valueOffset = 0, color) {

    this.type = "slider";

    this.setting = setting;

    this.x = x + 60;
    this.y = y;
    this.barX = x + Math.floor(width / 2);
    this.barY = y + Math.floor(height / 2);
    this.fixedPos = [this.x + width / 2, this.y];
    this.width = width;
    this.height = height;
    this.display = display;
    this.value = value;
    this.minMax = minMax;
    this.valueOffset = valueOffset;
    this.color = color;

    this.barWidth = this.width + Math.floor(this.display.settings.canvas.width / 2) - 48;

  }

  updatePos() {

    this.display.createWord(this.display.settings, this.setting, 48, this.y - 5, 0, false, 1, 16, 1, this.color);

    this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.color);
    this.display.createRect(this.display.settings, this.x, this.y, this.width, this.height, this.color);
    this.display.createRect(this.display.settings, this.fixedPos[0], this.fixedPos[1] + 3, this.barWidth, this.height - 6, this.color);

    this.display.createWord(this.display.settings, this.value, 196, this.y - 5, -0.5, false, 1, 16, 1, this.color);
    this.display.createFill(this.display.settings, this.x, this.y, this.width, this.height, this.color, 0.7)

  }

}

class Options {

  constructor(setting, x, y, display, options, index = 0, offsetX = 0, color) {

    this.type = "options";

    this.setting = setting;

    this.x = x + 168;
    this.y = y - 5;
    this.fixedPos = [this.x, this.y];
    this.offsetX = offsetX;

    this.display = display;
    this.options = options;
    this.index = index;
    this.color = color;

    this.display.settings.font = `16px MisterPixel`;
    this.width = this.display.settings.measureText(this.options[this.index])["width"];
    this.height = 16;

  }

  updatePos() {

    this.display.settings.font = `16px MisterPixel`;
    this.width = this.display.settings.measureText(this.options[this.index])["width"];

    this.x = this.fixedPos[0] + this.offsetX * this.width + 2;

    this.display.createWord(this.display.settings, this.setting, 48, this.y, 0, false);
    this.display.createWord(this.display.settings, this.options[this.index], this.fixedPos[0], this.y, this.offsetX);

  }

}


class Button {

    constructor(x, y, display, text, offsetX = 0, enabled, action) {

        this.type = "button";

        this.text = text;

        this.x = x;
        this.y = y - 6;
        this.fixedPos = [this.x, this.y];
        this.offsetX = offsetX;
        this.enabled = enabled;

        this.display = display;

        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.text)["width"];
        this.height = 16;

        this.action = action;
        
    }
    
    updatePos() {
        
        this.display.settings.font = `16px MisterPixel`;
        this.width = this.display.settings.measureText(this.text)["width"];
        
        this.x = this.fixedPos[0] + this.offsetX * this.width + 2;
        
        this.display.createWord(this.display.settings, this.text, this.fixedPos[0], this.y, this.offsetX, false, 1, 16, (this.enabled) ? 1 : 0.5, "white");
        
    }

}