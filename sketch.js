var PLAY = 1;
var END = 0;
var gameState = 1;
var treasureCollection = 0;
var end, endImg;

var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path = createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 7;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale = 0.1;
  
end = createSprite(width/2, height/2); 
end.addImage(endImg);
end.scale = 0.8;
end.visible = false;
  
cashG = new Group();
diamondsG = new Group();
jwelleryG = new Group();
swordGroup = new Group();

  boy.setCollider("circle", 0, 0, 400)
  boy.debug = false;
}

function draw() {
  
  background(0);
  
  boy.x = World.mouseX;
  
  edges = createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

   if(gameState === PLAY) {
    
    if(path.y > height ){
      path.y = height/2;
    }

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+50;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
    }
  }
  }

  if(gameState === END) {
    
    end.visible = true;
    
    path.velocityY = 0;
    boy.velocityY = 0
    boy.destroy();
    
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach(0);
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);
  }

  drawSprites();
  textSize(35);
  fill(255);
  textFont("TimesNewRoman");
  text("Treasure: "+ treasureCollection,20,40);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale = 0.2;
  cash.velocityY = 6;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale = 0.05;
  diamonds.velocityY = 6;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 120 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale = 0.2;
  jwellery.velocityY = 6;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 170 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale = 0.12;
  sword.velocityY = 6;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}