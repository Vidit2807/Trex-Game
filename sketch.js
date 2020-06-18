//global Variables
var trex,tRex,Trexcollided,cloud,obstacle,gameover,restart,Ground,ground,ground2,Cloud,Obstacle,Obstacle2,Obstacle3,Obstacle4,Obstacle5,Obstacle6,obstaclegroup,cloudgroup,score;
function preload(){
  tRex=loadAnimation("trex1.png","trex3.png","trex4.png");
  Ground=loadImage("ground2.png");
  Cloud=loadImage("cloud.png");
  Obstacle=loadImage("obstacle1.png");
  Obstacle2=loadImage("obstacle2.png");
    Obstacle3=loadImage("obstacle3.png");
    Obstacle4=loadImage("obstacle4.png");
    Obstacle5=loadImage("obstacle5.png");
    Obstacle6=loadImage("obstacle6.png");
  Gameover=loadImage("gameOver.png");
  Restart=loadImage("restart.png");
  Trexcollided=loadImage("trex_collided.png");
}
function setup() {
  createCanvas(600, 200);
   trex=createSprite(40,180,20,20);
  trex.addAnimation("tRex",tRex);
  trex.scale=0.5;
  ground=createSprite(300,180,400,10);
  ground.addImage("Gvrround",Ground);
  ground2=createSprite(300,185,600,10);
  ground2.visible=false;
  ground.velocityX=-5
  
 cloudgroup=new Group();
  obstaclegroup=new Group();
  score=0;
  gameover=createSprite(300,100,0,0);
  gameover.addImage(Gameover);
 gameover.visible=false;
  gameover.scale=0.5;
  restart=createSprite(300,140,0,0);
    restart.addImage(Restart);
   restart.scale=0.5;
  restart.visible=false;
  gamestate="play";
  trex.addAnimation("collide",Trexcollided);
}

function draw() {
  background(200);
text("score"+score,500,50);
  
   
  if(gamestate==="play"){

       score=score+Math.round(getFrameRate()/60);
  ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&&trex.y>=156.5){
    trex.velocityY=-13;
  }
        trex.velocityY=trex.velocityY+0.8;
  trex.collide(ground2);
    spawnclouds();
  spawnObstacles();
    if(obstaclegroup.isTouching(trex)){
      gamestate="end";
      
    }
  }else if(gamestate==="end"){
    restart.visible=true;
    gameover.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
      cloudgroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
     obstaclegroup.setLifetimeEach(-1);
    trex.changeAnimation("collide",Trexcollided);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
  
  
}

function spawnclouds(){
  if(frameCount%70===0){
  var cloud=createSprite(640,100,33,39);
  cloud.addImage("hgugttfrt",Cloud);
  cloud.velocityX=-5;
    cloud.y=Math.round(random(80,120));
      cloud.lifetime=120;
    cloudgroup.add(cloud);
  cloud.depth=trex.depth;
    trex.depth=trex.depth+0.8;
  }
}
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    obstacle.velocityX=ground.velocityX;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:
        obstacle.addImage(Obstacle);
        break;
         case 2:
        obstacle.addImage(Obstacle2);
        break;
         case 3:
        obstacle.addImage(Obstacle3);
        break;
         case 4:
        obstacle.addImage(Obstacle4);
        break;
         case 5:
        obstacle.addImage(Obstacle5);
        break;
         case 6:
        obstacle.addImage(Obstacle6);
        break;
        default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    obstaclegroup.add(obstacle);
  }
}
function reset(){
  gamestate="play";
  gameover.visible=false;
  restart.visible=false;
  cloudgroup.destroyEach();
   obstaclegroup.destroyEach();
  trex.changeAnimation("tRex",tRex);
  score=0;
  
}