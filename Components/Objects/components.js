class Octo extends Animator {

    constructor(x, y, w, h) {

        super(x, y, w, h, [0, 1, 2, 3, 4], 4.5);

    }

}
class Underwater extends Animator {

    constructor(x, y, w, h) {

        super(x, y, w, h, [8], 4.5, "stop");

    }

}