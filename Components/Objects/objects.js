class StaticObject {

    constructor(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }

}

class Animator extends StaticObject {
    
    constructor(x, y, w, h, frameSet, delay, mode = "loop") {
        
        super(x, y, w, h);

        this.count = 0;
        this.frameSet = frameSet;
        this.delay = delay;
        this.frameI = 0;
        this.frame = frameSet[0];
        this.mode = mode;

    }

    animate() {

        if (this.mode = "loop")
            this.loop();

    }

    changeFrameSet(frameSet, mode, delay, frameI) {

        if (frameSet === this.frameSet)
            return;

        this.count = 0;
        this.frameSet = frameSet;
        this.delay = delay;
        this.frameI = frameI;
        this.frame = frameSet[frameI];
        this.mode = mode;

    }

    loop() {

        this.count++;

        while(this.count > this.delay) {

            this.count -= this.delay;

            this.frameI = (this.frameI + 1) % this.frameSet.length;
            this.frame = this.frameSet[this.frameI];

        }

    }

}
class Frames {
    
    constructor(x, y, w, h, offsetX = 0, offsetY = 0) {
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        
    }
    
}
    
class TileSet {

    constructor() {

        const f = Frames;

        this.frames = [
            new f(0, 0, 32, 32), new f(32, 0, 32, 32), new f(64, 0, 32, 32), new f(96, 0, 32, 32), new f(128, 0, 32, 32), new f(160, 0, 32, 32), new f(192, 0, 32, 32), new f(224, 0, 32, 32),
            new f(0, 0, 96, 72)
        ];

    }

}