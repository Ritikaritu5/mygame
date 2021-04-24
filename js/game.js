class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(50,500);
    player1.addImage("player1",player_img);
    player1.scale = 0.5;
    
    player2 = createSprite(50,500);
    player2.addImage("player2", player_img);
    player2.scale = 0.5;
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 200;
                     y=200-allPlayers[plr].distance;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-55,y-70);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         
                         text("Player 1 :" +allPlayers.player1.score,50,50);
                        text("Player 2 :" + allPlayers.player2.score, 50, 100);

                        textSize(25);
                         fill("white");
                         
                         text(" Lives of Player 1 :" +allPlayers.player1.lifetime,300,50);
                        text(" Lives of Player 2 :" + allPlayers.player2.lifetime, 600, 50);
                 
                 }
                
                
                 

                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
            
                 if (frameCount % 50 === 0) {
                     fruits = createSprite(1000, random(70, 1000), 100, 100);
                     fruits.velocityX = -6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 if (frameCount % 500 === 0) {
                    enemy = createSprite(1000, random(1, 1000), 100, 100);
                    enemy.velocityX = -6;
                    enemy.scale = 2;
                    var rand = Math.round(random(1,5));
                    switch(rand){
                        case 1: enemy.addImage("enemy1",fruit1_img);
                        break;
                        case 2: enemy.addImage("enemy1", fruit2_img);
                        break;
                        case 3: enemy.addImage("enemy1", fruit3_img);
                        break;
                        case 4: enemy.addImage("enemy1", fruit4_img);
                        break;
                        case 5: enemy.addImage("enemy1", fruit5_img);
                        break;
                    }
                    enemyGroup.add(enemy);
                    
                }

          
                
                 
                  if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length; i++) {
                          if (fruitGroup.get(i).isTouching(players)) {
                              fruitGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();
                              
                          }
                          
                      }
                  }
                  if (player.index !== null) {
                    for (var i = 0; i < enemyGroup.length; i++) {
                        if (enemyGroup.get(i).isTouching(players)) {
                            enemyGroup.get(i).destroy();
                            player.lifetime =player.lifetime-1;
                            player.update();
                            
                        }
                        
                    }
                }
              

         
      
        
         

    }

    end(){
       console.log("Game Ended");
    }
}