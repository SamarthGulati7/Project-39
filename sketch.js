
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var backImage,bg;
var score;
var survivalTime;
var canvas;
var end;
var deaths = 0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage=loadImage("jungle.jpg");
}



function setup() {
  
  canvas= createCanvas(900,750);
  
  bg=createSprite(0,460,displayWidth*2,displayHeight*2);
  bg.addImage(backImage);
  bg.velocityX=-3;
  bg.scale=2;
  
  monkey=createSprite(-250,650,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;
  //monkey.velocityX=3;
  
  ground=createSprite(displayWidth/2,680,displayWidth*2,10);
  ground.visible=false;
  
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();

  survivalTime=0;
  score=0;
}


function draw() {
 
 background(backImage);
  
 if(keyDown("space")){
   
   monkey.velocityY=-12;
   
 }
  
  monkey.velocityY=monkey.velocityY+ 0.8;
  
  monkey.collide(ground);
  
 if(ground.x<0){
   
   ground.x=ground.width/2;
   
 } 
  
 if(bg.x<0){
   
   bg.x=bg.width/2;
   
 } 
  
 if(monkey.isTouching(FoodGroup)){
    
   FoodGroup.destroyEach();
   score=score+2;
   
    }
  
  if(monkey.isTouching(obstacleGroup)){
    
   obstacleGroup.destroyEach();
   deaths+=1
   
    }
  
  camera.position.x= 0;
  camera.position.y= monkey.y-150; 

  
  
 spawnBananas(); 
 spawnObstacles(); 
  
 
  
 drawSprites();

 if(deaths === 5 ){
  
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.destroy();
  bg.velocityX=0;
  stroke("green");
  textSize(50);
  fill("blue");
  text("Game Ended!",-200,500);

  }
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Score: "+score,-400,200);
  
  stroke("black");
  textSize(20);
  fill("red");
  survivalTime=Math.round(frameCount/frameRate());
  text("Survival time: "+survivalTime,0,200);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Deaths: "+deaths,-200,200);
}

function spawnObstacles(){
  
 if(frameCount% 200 === 0) {
    var obstacle = createSprite(400,displayHeight-220,10,40);
  
    obstacle.velocityX = -6;
  
    obstacle.addImage(obstacleImage);
           
    obstacle.scale =  0.1;
    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);
  }

}

function spawnBananas() {
  
  if (frameCount% 100 === 0) {
    var banana = createSprite(600,0,40,10);
    banana.y = Math.round(random(225,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=500;
    
    FoodGroup.add(banana);
}

}
