const keyDown = (e) => {

    if (gameState == 1 && healthTarget > 0) {

        if (e.key.length == 1) {
    
            if (display.input == "...")
                display.input = "";

            if (display.input.length < 10)
                display.input += e.key;
    
        }
    
        if (display.input != "...") {
    
            switch (e.code) {
        
                case "ControlLeft": case "ControlRight":
                    ctrl = true;
                    break;
        
                case "Backspace":

                    display.input = display.input.substring(0, display.input.length - 1);

                    if (ctrl) {
                        if (display.input.includes(" ")) {
                            
                            display.input = display.input.split(" ")[0];
        
                        } else {
        
                            display.input = "";
                            
                        }
                        
                    }
                    break;

                case "Enter":

                    if (check() != null)
                        gameState = 3;

                    display.input = "";
                    break;
        
            }
    
        }

    }

}

const keyUp = (e) => {

    if (gameState == 4)
        setup(false);

    switch (e.code) {

        case "ControlLeft": case "ControlRight":
            ctrl = false;
            break;

        case "Escape":
            switch(Math.floor(gameState)) {

                case 1:
                    gameState = 0 + lastPage;
                    break;

                case 0:
                    gameState = 1;
                    break;

            }
            break;

    }
    

}

const mouseDown = (e) => {

    if (Math.floor(gameState) == 0)
        mouseInput = new MouseInput(e);

}

const mouseUp = () => {

    if (gameState == 4)
        setup(false);
    
    if (mouseInput != undefined && mouseInput.element != undefined && mouseInput.element.type == "options") {

        mouseInput.element.index *= 1;
        mouseInput.element.index = (mouseInput.element.index + 1) % mouseInput.element.options.length;

    }

    if (mouseInput != undefined && mouseInput.element != undefined && mouseInput.element.type == "button") {

        mouseInput.element.action();

    }

    mouseInput = undefined;

}

class MouseInput {

    constructor(e) {

        let page = subPage ? pages[Math.floor(gameState * 10 - 1)][pages[Math.floor(gameState * 10 - 1)].length - 1] : pages[Math.floor(gameState * 10 - 1)];

        this.updateValue = function() {

            if (this.element.type == "slider")
                this.element.value = Math.ceil((this.element.x - (this.element.fixedPos[0] - Math.floor(this.element.width / 2))) / (this.element.barWidth / this.element.minMax[1])) + this.element.valueOffset;

        };
        
        this.getElement = function() {

            for (let i = 0; i < page.length; i++) {

                if ( page[i].type == "slider" && ((e.clientX - edge[0] > Math.floor((page[i].fixedPos[0] / 384 * 0.8 + 0.1) * display.display.canvas.width) && e.clientX - edge[0] < Math.floor(((page[i].fixedPos[0] + page[i].barWidth) / 384 * 0.8 + 0.1) * display.display.canvas.width)) && (e.clientY - edge[1] > Math.floor((page[i].fixedPos[1] / 288 * 0.8 + 0.1) * display.display.canvas.height) && e.clientY - edge[1] < Math.floor(((page[i].fixedPos[1] + page[i].height) / 288 * 0.8 + 0.1) * display.display.canvas.height))) ) {

                    page[i].x = Math.floor( Math.round( ( ( (((e.clientX - edge[0]) / display.display.canvas.width - 0.1) / 0.8 * 384) ) - page[i].fixedPos[0]) / (page[i].barWidth / page[i].minMax[1])) * (page[i].barWidth / page[i].minMax[1]) + page[i].fixedPos[0] - page[i].width / 2);
                    return (page[i]);

                }


                if ((e.clientX - edge[0] > Math.floor((page[i].x / 384 * 0.8 + 0.1) * display.display.canvas.width) && e.clientX - edge[0] < Math.floor(((page[i].x + page[i].width) / 384 * 0.8 + 0.1) * display.display.canvas.width)) && (e.clientY - edge[1] > Math.floor((page[i].y / 288 * 0.8 + 0.1) * display.display.canvas.height) && e.clientY - edge[1] < Math.floor(((page[i].y + page[i].height) / 288 * 0.8 + 0.1) * display.display.canvas.height)))
                    return(page[i]);

                
            }
            
        };
        
        this.element = this.getElement();

        if (this.element != undefined)
            this.updateValue();

    }
    
    move(e) {
    
        if (mouseInput != undefined && mouseInput.element != undefined && mouseInput.element.type == "slider") {
            
            if (e.clientX - edge[0] > Math.floor((mouseInput.element.fixedPos[0] / 384 * 0.8 + 0.1) * display.display.canvas.width - (mouseInput.element.width / 2 - 4)) && e.clientX - edge[0] < Math.floor(((mouseInput.element.fixedPos[0] + mouseInput.element.barWidth) / 384 * 0.8 + 0.1) * display.display.canvas.width) )
                mouseInput.element.x = Math.floor( Math.round( ( ( (((e.clientX - edge[0]) / display.display.canvas.width - 0.1) / 0.8 * 384) ) - mouseInput.element.fixedPos[0]) / (mouseInput.element.barWidth / mouseInput.element.minMax[1])) * (mouseInput.element.barWidth / mouseInput.element.minMax[1]) + mouseInput.element.fixedPos[0] - mouseInput.element.width / 2);


            if (e.clientX - edge[0] < Math.floor((mouseInput.element.fixedPos[0] / 384 * 0.8 + 0.1) * display.display.canvas.width - (mouseInput.element.width / 2 - 4)) )
                mouseInput.element.x = mouseInput.element.fixedPos[0] - Math.floor(mouseInput.element.width / 2);

            if (e.clientX - edge[0] > Math.floor(((mouseInput.element.fixedPos[0] + mouseInput.element.barWidth) / 384 * 0.8 + 0.1) * display.display.canvas.width) )
                mouseInput.element.x = mouseInput.element.fixedPos[0] + mouseInput.element.barWidth - Math.floor(mouseInput.element.width / 2);

            mouseInput.updateValue();

        }
    
    }

}
let mouseInput = undefined;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);