
var spaceShip, spaceShipImg;
var enemy1, enemy2, enemy3, enemy4;
var enemy1Img, enemy2Img, enemy3Img, enemy4Img;
var life,life2,life3;
var lifeImg, lostLifeImg, fire, fireImg;
var bgImg;
var fire, fireImg;
var lifes, lLifes;
var lifeScore;
INTRO = 0;
PLAY = 1;
END = 2;
var gameState = INTRO;
var start,startImg;
var restart,go,restartImg,goImg;
var score = 0;


function preload() {
    spaceShipImg = loadImage("player1.png");

    enemy1Img = loadImage("enemy1.png");
    enemy2Img = loadImage("enemy2.png");
    enemy3Img = loadImage("enemy3.png");
    enemy4Img = loadImage("enemy4.png");

    lifeImg = loadAnimation("life1.png");
    lostLifeImg = loadAnimation("life4.png");

    bgImg = loadImage("background.jpg");

    fireImg = loadImage("fire.png");
    startImg = loadImage("start.png");

    goImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(700, 500);

    spaceShip = createSprite(300, 420, 50, 50);
    // spaceShip.scale = 2;

    enemies = new Group();
    fires = new Group();
    blasts = new Group();
    edges = createEdgeSprites(0,1);
    
    start = createSprite(350,410,30,30);
    start.addImage(startImg);

    lifeScore = 3;
    life = createSprite(560,20,50,50);
    life.addAnimation("rlife" , lifeImg);
    life.addAnimation("lLife", lostLifeImg);
    life.scale = 0.1;

    life2 = createSprite(610,20,50,50);
    life2.addAnimation("rlife" , lifeImg);
    life2.addAnimation("lLife", lostLifeImg);
    life2.scale = 0.1;

    life3 = createSprite(660,20,50,50);
    life3.addAnimation("rlife" , lifeImg);
    life3.addAnimation("lLife", lostLifeImg);
    life3.scale = 0.1;

    go = createSprite(350,180);
    go.addImage(goImg);
    go.scale = 2;
    
    restart = createSprite(350,380);
    restart.addImage(restartImg);
    restart.scale = 0.5;

    go.visible = false;
    restart.visible = false;
}

function draw() {
    
    if(gameState==INTRO){
        background("blue");
        fill("black");
        textSize(30);
        text('From the galaxy Tofu, some aliens are trying to \n        invade the Earth using spaceships.\nDynamite is assigned to save the planet and\n         it will be getting 3 chances to do it.\n\n\n          Press start button to start the game',30,100);
        
    }

    if(mousePressedOver(start)&& gameState == INTRO){
        start.destroy();
        gameState = PLAY;
    }

    if(mousePressedOver(start)&& gameState == END){
        start.destroy();
        gameState = PLAY;
    }
    
    if(gameState==PLAY){
        background(bgImg);
        // spaceShip = createSprite(300, 420, 50, 50);
        {
            fill("white");
            textSize(30);
            text("Score: " + score,380,30);
        }
        spaceShip.addImage(spaceShipImg);
        spaceShip.scale = 2;
        
        spaceShip.bounceOff(edges);


    if (keyDown(32) || keyDown(32) && keyDown(LEFT_ARROW) || keyDown(32) && keyDown(RIGHT_ARROW )) {
        spawnFire();
    }

    if (keyDown(LEFT_ARROW)) {
        spaceShip.x -= 5;
    }

    if (keyDown(RIGHT_ARROW)) {
        spaceShip.x += 5;
    }

    console.log(lifeScore);


    if(enemies.isTouching(fires)){
        enemies[0].destroy();
        fires.destroyEach();
        score += 10;
    }

    if(enemies.isTouching(spaceShip)){
        enemies[0].destroy();
        lifeScore -= 1;

        if(lifeScore == 2){
            life.changeAnimation("lLife");
        }
        if(lifeScore == 1){
            life2.changeAnimation("lLife");
        }
        if(lifeScore == 0){
            life3.changeAnimation("lLife");
            gameState = END;
        }
    }

    if(lifeScore === 0){
        gameState = END;
    }

    // drawSprites();
    spawnEnemies();
    }

    if(gameState===END){
        spaceShip.destroy();
        enemies.destroyEach();
        life.destroy();
        life2.destroy();
        life3.destroy();
        start.destroy();
        go.visible = true;
        restart.visible = true;
        background("black");
        fill("white");
    }

    drawSprites();
    
}

// Enemies

function enemies1(){
    if (frameCount % 80 === 0 && gameState==PLAY) {
        enemy1 = createSprite(Math.round(random(10, 590)), 0, 50, 50);
        enemy1.addImage(enemy1Img);
        enemy1.velocityY = 3.5;
        enemy1.scale = 1.8;
        enemy1.lifeTime = 200;
        enemies.add(enemy1);
    }
}

function enemies2() {
    if (frameCount % 80 === 0 && gameState==PLAY) {
        enemy2 = createSprite(Math.round(random(10, 590)), 0/*Math.round(random(0, 100))*/, 50, 50);
        enemy2.addImage(enemy2Img);
        if (enemy2.x <= 400) {
            enemy2.velocityX = 2;
            enemy2.velocityY = 3;
        } else {
            enemy2.velocityX = -2;
            enemy2.velocityY = 3;
        }
        enemy2.scale = 1.8;
        enemy2.lifeTime = 200;
        enemies.add(enemy2);
    }
}

function enemies3(){
    if (frameCount % 80 === 0 && gameState==PLAY) {
        enemy3 = createSprite(Math.round(random(10, 590)), 0, 50, 50);
        enemy3.addImage(enemy3Img);
        enemy3.velocityY = 3;
        enemy3.scale = 1.8;
        enemy3.lifeTime = 200;
        enemies.add(enemy3);
    }
}

function enemies4() {
    if (frameCount % 80 === 0 && gameState==PLAY) {
        enemy4 = createSprite(Math.round(random(10, 590)), 0, 50, 50);
        enemy4.addImage(enemy4Img);
        if (enemy4.x <= 400) {
            enemy4.velocityX = 3;
            enemy4.velocityY = 3;
        } else {
            enemy4.velocityX = -3;
            enemy4.velocityY = 3;
        }
        enemy4.scale = 1.8;
        enemy4.lifeTime = 200;
        enemies.add(enemy4);
    }
}

// Spawning enemies

function spawnEnemies() {
    r = Math.round(random(1,4));
    if(r==1){
        enemies1();
    }
    else if(r==2){
        enemies2();
    }
    else if(r==3){
        enemies3();
    }
    else if(r==4){
        enemies4();
    }
}


// Fires

function spawnFire() {
    if(frameCount%5==0){
        fire = createSprite(spaceShip.x, spaceShip.y);
        fire.addImage(fireImg);
        fire.velocityY = -3;
        fire.scale = 0.3;
        fire.lifeTime = 200;
        spaceShip.depth += fire.depth;
        fires.add(fire);
    }
}