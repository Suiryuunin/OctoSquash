
// Haven't added the enemy yet, but whatever

"use strict";

let edge = [0, 0];

let gameState = 1;
let ctrl = false;
let number = 0;
let hint = "Something went wrong...";
let lastPage = 0.1;
let healthWidth = 128;
let health = healthWidth;
let healthTarget = 0;
let hColor = `hsl(183, 75 %, 63%)`;
let subPage = false;

const player = new Octo(8, 96, 32, 32);
const background = new Underwater(0, 0, 96, 72);

if (localStorage.getItem("Health") == null)
    localStorage.setItem("Health", 5);

if (localStorage.getItem("MaxWords") == null)
    localStorage.setItem("MaxWords", 50);


const check = () => {

    if (display.input == number) {

        hint = " >▿<";
        return 69;

    }
    
    if (display.input * 0 != 0) {

        hint = "(ノಠ益ಠ)ノ彡┻━┻";
        healthTarget--;

        heavy.currentTime = 0.115;
        heavy.play();

    }
    else {

        if (display.input > number)
        hint = "🢃";
        
        if (display.input < number)
            hint = "🢁";
        
        light.currentTime = 0.105;
        light.play();

    }

    player.changeFrameSet([5], "ah", 10, 0);
    changed = true;

    healthTarget--;

}

const end = (setting) => {

    display.createFill(display.buffer, 1, 1, viewport[0] - 2, viewport[1] - 2, setting[2], 0.05);
    display.createWord(display.buffer, setting[0], Math.floor(viewport[0] / 2), Math.floor(viewport[1] / 2) - 8, -0.5, false, 1, 32, 1, setting[1]);

    if (setting[0] == "YOU DIED" && !changed2) {

        player.changeFrameSet([6, 7], "loop", 12, 0);
        changed2 = true;

    }

};

const resize = () => {

    display.resize(window.innerWidth, window.innerHeight, viewport[1]/viewport[0]);

    edge[0] = Math.floor((window.innerWidth - display.display.canvas.width) / 2);
    edge[1] = Math.floor((window.innerHeight - display.display.canvas.height) / 2);

};

const render = () => {

    (display.drawBackground(display.backdrop));
    display.drawObject(
        display.backdrop, display.imgs[1],
        tileSet.frames[background.frame].x, tileSet.frames[background.frame].y,
        background.x, background.y,
        tileSet.frames[background.frame].w / 0.8, tileSet.frames[background.frame].h / 0.8,
        4, true
    );

    
    // Veil
    display.drawBackground(display.backdrop, "darkblue", 0.5);

    display.createWord(display.backdrop, "Octo Squash", Math.floor(BackV[0] / 2), 4, -0.5, true, 1, 27, 1, "cyan");
    display.createWord(display.backdrop, "Octo Squash", Math.floor(BackV[0] / 2), 4, -0.5, true, 1, 27, 1, "rgba(255, 255, 255, 0.75)");

    if (health > 0) {

        if (gameState < 2) {


            (display.drawBackground(display.buffer));
            display.drawObject(
                display.buffer, display.imgs[1],
                12, 9,
                background.x, background.y,
                tileSet.frames[background.frame].w, tileSet.frames[background.frame].h,
                4
            );
            
            display.createRect(display.buffer, 0, 0, viewport[0], viewport[1], "rgb(9, 165, 255)");
            display.createRect(display.buffer, 0, 0, viewport[0], viewport[1], "rgba(0, 0, 0, 0.5)");
            
            display.createWord(display.buffer, `[${display.input}]`, Math.floor(viewport[0] / 2), 128, -0.5, false, 1, 16);
            display.createWord(display.buffer, hint, Math.floor(viewport[0] / 2), 160, -0.5, false, 1, 16, 1, "black", "MisterPixel");
            
            
            // Health
            display.createRect(display.buffer, 18, viewport[1] - 48, 128, 8);
            display.createRect(display.buffer, 18, viewport[1] - 48, 128, 8);
            display.createFill(display.buffer, 18, viewport[1] - 48, health, 8, hColor, 0.5);
            
        }

    }
    else if (gameState < 2) {

        gameState = 2;
        
    }
    
    display.drawObject (
        display.buffer, display.imgs[0],
        tileSet.frames[player.frame].x, tileSet.frames[player.frame].y,
        player.x, player.y,
        tileSet.frames[player.frame].w, tileSet.frames[player.frame].h,
        4
    );

    // Settings

    display.createFill(display.settings, 0, 0, viewport[0], viewport[1], "black");

    if (Math.floor(gameState) == 0) {

        display.createRect(display.settings, 0, 0, viewport[0], viewport[1], "lightgray", 2);
        

        for (let i = 0; i < pages[Math.floor(gameState * 10) - 1].length; i++) {
          
            if (pages[Math.floor(gameState * 10) - 1][i].updatePos != undefined) {
              
                pages[Math.floor(gameState * 10) - 1][i].updatePos();
              
            }
            if (subPage) {
              
              display.createFill(display.settings, 2, 2, viewport[0] - 4, viewport[1] - 4, "black", 1);
              for (let j = 0; j < pages[Math.floor(gameState * 10) - 1][i].length; j++)
                pages[Math.floor(gameState * 10) - 1][i][j].updatePos();
              
            }

        }
    
    }

    /* ---- */

    display.render();

};

let timer = 0;
let changed = false;
let timer2 = 0;
let changed2 = false;
const update = () => {

    if (audio.currentTime >= 40) {

        audio.currentTime = 8;

    }

    if (changed) {

        if (timer2 > 5) {
            
            player.changeFrameSet([0, 1, 2, 3, 4], "loop", 4.5, 0);
            changed = false;
            timer2 = 0;

        }
        else {

            timer2++;

        }

    }
    
    if (gameState >= 2) {
        
        if (timer < 45) {
            
            end(gameState > 2 ? ["Ain't no way", "lightgreen", "black"] : ["YOU DIED", "black", "darkred"]);
            timer++;

        }
        else {

            gameState = 4;
            end(["Restart?", "white", "black"]);

        }

    }

    if (Math.floor(gameState) == 0) {

        localStorage.setItem("Health", pages[0][1].value - pages[0][1].valueOffset);
        localStorage.setItem("MaxWords", pages[0][2].value - pages[0][2].valueOffset);

        if (mouseInput != undefined)
            window.addEventListener("mousemove", mouseInput.move);
      
    } else {
      
        settings.modify(pages[0][1].value, pages[0][2].value);
      
    }

    if (health >= Math.floor(healthTarget * (healthWidth / settings.health)))
        health -= Math.ceil((health - healthTarget * (healthWidth / settings.health)) / 5);
    else
        health -= Math.floor((health - healthTarget * (healthWidth / settings.health)) / 20);

  
    hColor = `hsl(${healthWidth - (healthWidth - health)}, 75%, 63%)`;

    if (display.input == "")
        display.input = "...";

    player.animate();
    background.animate();

};

const settings = new Settings();

// Drawn by meself
const display = new Display(document.querySelector("canvas"), ["Assets/Sprites/Squid.png", "Assets/Sprites/Underwater.png"]);
const engine = new Engine(1000/30, update, render);
const viewport = [32 * 12, 32 * 9];
const BackV = [32 * 12 / 0.8, 32 * 9 / 0.8];
const tileSet = new TileSet();

// Composed by meself as well
const audio = new Audio("Assets/Audio/Submerged.wav");

// Recorded by meself too
const light = new Audio("Assets/Audio/light.wav");
const heavy = new Audio("Assets/Audio/heavy.wav");

const instructionsPt1 = [

    "- Type a guess",
    "- Try to get the right number before",

];

const instructionsPt2 = [

    "   your life runs out",
    "- Press Enter to confirm",
    "- Press Esc to pause or resume"

];


const pages = [
    [
        new Word("Settings", Math.floor(viewport[0] / 2), 32, -0.5, false, 1, 32),
        new Slider("Health", Math.floor(viewport[0] / 2) - 32, 96, 8, 8, display, localStorage.getItem("Health"), [0, 5], 5, "white"),
        new Slider("Max Value", Math.floor(viewport[0] / 2) - 32, 128, 8, 8, display, localStorage.getItem("MaxWords"), [0, 50], 50, "white"),
        new Button(Math.floor(viewport[0] / 2), 196, display, "Instructions", -0.5, true, () => subPage = true),
        [
          
            new Word("Instructions", Math.floor(viewport[0] / 2), 32, -0.5, false, 1, 32), 
            new Word(instructionsPt1, 64, 64, 0, false, 2, 16, 32),
            new Word(instructionsPt2, 64, 114, 0, false, 3, 16, 32),
            new Button(12, 260, display, "<-", 0, true, () => subPage = false)
          
        ]
    ]
]

display.backdrop.canvas.width = BackV[0];
display.buffer.canvas.width = display.settings.canvas.width = viewport[0];
display.backdrop.canvas.height = BackV[1];
display.buffer.canvas.height = display.settings.canvas.height = viewport[1];

display.buffer.font = "32px MisterPixel";
const _deathWidth = display.buffer.measureText("YOU DIED")["width"];

for (let i = 0; i < pages.length; i++) {

    for (let j = 0; j < pages[i].length; j++) {

        if (pages[i][j].type == "slider")
            pages[i][j].x = Math.floor(pages[i][j].value * (pages[i][j].barWidth) / (pages[i][j].minMax[1])) + (pages[i][j].fixedPos[0] - Math.floor(pages[i][j].width / 2));

    }

}

const setup = (reset, load = 1) => {

    update();
    number = Math.ceil(Math.random() * settings.max);
    health = 1;
    healthTarget = settings.health;
    gameState = load;
    subPage = reset;
    timer = 0;
    hint = " >▿<";
    changed2 = false;
    
    for (let i = 0; i < pages.length; i++) {
    
        for (let j = 0; j < pages[i].length; j++) {
            if (pages[i][j].type == "slider")
                pages[i][j].value = Math.ceil((pages[i][j].x - (pages[i][j].fixedPos[0] - Math.floor(pages[i][j].width / 2))) / (pages[i][j].barWidth / pages[i][j].minMax[1])) + pages[i][j].valueOffset;
    
        }
    
    }

    player.changeFrameSet([0, 1, 2, 3, 4], "loop", 4.5, 0);
    
    resize();
    engine.start();

};

window.addEventListener("load", setup(true, lastPage));
window.addEventListener("resize", resize);
window.addEventListener("click", () => {

    audio.play();
    
}, {once: true});



// audio.addEventListener("ended", () => {

//     console.log(audio.currentTime);

//     audio.currentTime = 7.9;
//     audio.play();
//     console.log(audio.currentTime);

// });