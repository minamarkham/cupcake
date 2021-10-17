//Preloading audio stuff
var mainMusic = document.getElementById("main_music"),
    foodMusic = document.getElementById("food"), 
    goMusic = document.getElementById("gameOver");

var files = [mainMusic, foodMusic, goMusic];
var counter = 0;

var start = document.getElementById("start"),
    loading = document.getElementById("loading");

for(var i = 0; i < files.length; i++) {
  var file = files[i];
  file.addEventListener("loadeddata", function() {
    counter++;
    var percent = Math.floor((counter/files.length)*100);
    loading.innerHTML = "Loading " + percent + "%";
    if(percent == 100) showButton();
  });
}

function showButton() {
  start.style.top = "30%";
  loading.style.top = "100%";
}

//Initializing Canvas
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    
    //Full width and height
    w = window.innerWidth,
    h = window.innerHeight;
  
canvas.height = h;
canvas.width = w;

var reset, scoreText,menu, reMenu, score = 0;

function init() {
  mainMusic.play();
  menu.style.zIndex = "-1";
  
  var snake,
      size = 10,
      speed = 25,
      dir,
      game_loop,
      over = 0,
      hitType;
  
  //Custom funny gameover messages
  var msgsSelf = [];
  msgsSelf[0] = "There's plenty of food. Don't eat yourself!";
  msgsSelf[1] = "Is your body tastier than the food?";
  msgsSelf[2] = "AArrgghhh!! I bit myself!!"; 
  msgsSelf[3] = "Do you have Autophagia?";  
  
  var msgsWall = [];
  msgsWall[0] = "You broke your head!";
  msgsWall[1] = "The wall is stronger than it seems!";
  msgsWall[2] = "There's no way to escape the game...";
  msgsWall[3] = "LOOK MA! NO HEAD..!!";
  msgsWall[4] = "Can't see the wall? Huh?";
  
  function paintCanvas() {
    ctx.fillStyle = "#f37";
    ctx.fillRect(0, 0, w, h);
  }
  
  var Food = function(){
    this.x = Math.round(Math.random() * (w - size) / size);
    this.y = Math.round(Math.random() * (h - size) / size);
    
    this.draw = function() {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x*size, this.y*size, size, size);
    }
  }
      
      var f = new Food();
  
  //Initialize the snake
  function initSnake() {
    var length = 10;
    snake = [];
    for(var i = length - 1; i >= 0; i--) {
      snake.push({x: i, y: 0});
    }
  }
  
  function paintSnake() {
    for(var i = 0; i < snake.length; i++) {
      var s = snake[i];
      
      ctx.fillStyle = "white";
      ctx.fillRect(s.x*size, s.y*size, size, size);
    }
  }
  
  function updateSnake() {
    //Update the position of the snake
    var head_x = snake[0].x;
    var head_y = snake[0].y;
    
    //Get the directions
    document.onkeydown = function(e) {
      var key = e.keyCode;
      //console.log(key);
      
      if(key == 37 && dir != "right") setTimeout(function() {dir = "left"; }, 30);
      else if(key == 38 && dir != "down") setTimeout(function() {dir = "up"; }, 30);
      else if(key == 39 && dir != "left") setTimeout(function() {dir = "right"; }, 30);
      else if(key == 40 && dir != "up") setTimeout(function() {dir = "down"; }, 30);

      if(key) e.preventDefault();

    }
      
      //Directions
      if(dir == "right") head_x++;
    else if(dir == "left") head_x--;
    else if(dir == "up") head_y--;
    else if(dir == "down") head_y++;
    
    //Move snake
    var tail = snake.pop();
    tail.x = head_x;
    tail.y = head_y;
    snake.unshift(tail);
     
    //Wall Collision
    if(head_x >= w/size || head_x <= -1 || head_y >= h/size || head_y <= -1) {          
      if(over == 0) {
        hitType = "wall";
        gameover();
      }
      over++
    }
    
    //Food collision
    if(head_x == f.x && head_y == f.y) {
      coll = 1;
      f = new Food();
      var tail = {x: head_x, y:head_y};
      snake.unshift(tail);  
      score += 10;
      scoreText.innerHTML = "Score: "+score;
      foodMusic.pause();
      foodMusic.currentTime = 0;
      foodMusic.play();
      
      //Increase speed
      if(speed <= 45) speed ++;
      clearInterval(game_loop);
      game_loop = setInterval(draw, 1000/speed);
    }
    
    else {
      //Check collision between snake parts
      for(var j = 1; j < snake.length; j++) {
        var s = snake[j];
        if(head_x == s.x && head_y == s.y) {
          if(over == 0) {
            hitType = "self";
            gameover(); 
          }
          over++;
        }
      } 
    }
  }
  
  function draw() {
    paintCanvas();
    paintSnake();
    updateSnake();
    
    //Draw food
    f.draw();
  }
  
  reset = function() {
    initSnake();
    f = new Food();
    reMenu.style.zIndex = "-1"
    dir = "right";
    over = 0;
    speed = 30;
    if(typeof game_loop != "undefined")  clearInterval(game_loop); 
    game_loop = setInterval(draw, 1000/speed);
    

    score = 0;
    scoreText.innerHTML = "Score: "+score;
    mainMusic.currentTime = 0;
    mainMusic.play();
    
    return;
  }
    
    function gameover() {
      clearInterval(game_loop);
      mainMusic.pause();
      goMusic.play();
            
      //Get the gameover text
      var goText = document.getElementById("info2");
      
      //Show the messages
      if(hitType == "wall") {
        goText.innerHTML = msgsWall[Math.floor(Math.random() * msgsWall.length)];
      }
      else if(hitType == "self") {
        goText.innerHTML = msgsSelf[Math.floor(Math.random() * msgsSelf.length)];
      }
      
      reMenu.style.zIndex = "1";
    }
  
  reset();
}

//Menus
function startMenu() {
  menu = document.getElementById("menu");
  reMenu = document.getElementById("reMenu");
  
  scoreText = document.getElementById("score");
  reMenu.style.zIndex = "-1"
}

startMenu();