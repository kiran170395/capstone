var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shiping, helicopterimg, bombimg;
var water, ship, Helicopter, Bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shiping = loadAnimation("ship.png","ship2.png","ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadAnimation("shark.png");
}

function setup() {
  createCanvas(800, 600);
  
  //creating water ground
  water = createSprite(700,500);
  water.addImage(waterbg);
  water.velocityX=-3;

  //creating ship

ship=createSprite(400,350,150,150);
ship.addAnimation("saling ship",shiping);

  //creating groups
  helicopterGroup=new Group();
  bombGroup=new Group();

  ///ship.debug = "true";
  ship.setCollider("rectangle", 0, 10,400,400)
}

function draw() {
  background(skybg);
  fill("yellow");
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);

  ship.x = World.mouseX;
  edges= createEdgeSprites();
  ship.collide(edges);
  ship.scale =0.75;

  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    
    //Call user defined function
   Helicopter();
   Bomb();
    
   
    if(bombGroup.isTouching(ship)){
        gameState = END;

    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addAnimation("saling ship",restartimg);
   //water velocity becomes zero
    water.velocityX=0;
   
   
    //destroy Helicopter group
   helicopterGroup.destroyEach();
   
   //destroy bomb group
    
   bombGroup.destroyEach();
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
  drawSprites();
}


function Helicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale =0.50;
    
    helicopterGroup.add(helicopter);
  }
}

function Bomb(){
 // create bombs at random position
 //use Math.random
 if (frameCount % 300 == 0) {
  var bomb= createSprite(Math.round(random(50, 550)),40, 10, 10);
  bomb.addImage(bombimg);
  bomb.scale=0.12;
 bomb.velocityY=3;
  bomb.lifetime = 200;
  bombGroup.add(bomb);
}
}