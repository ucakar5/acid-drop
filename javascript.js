
  
  
  let controls = new Array(12);
      for (let i = 0; i < controls.length; i++){
        controls[i]=new Array(3);
        controls[i][1]=false;
      }
      setControls();
      
      
      
      let score = new Array(2);
      score[0]=300;
      score[1]=600;

     
     
      let canvas = document.querySelector('canvas');
      let myFont = new FontFace('myFont', 'url(font.ttf)');
      myFont.load().then(function(font){
        document.fonts.add(font);
        console.log('Font loaded');
      });	


      let sliderWidth = 300;
      let sliderHeight = 10;
      let sliderX = 290;
      let sliderY = 315;
      let handleWidth = 20;
      let handleHeight = 40;
      let sliderValue;
      let isDragging = false;

      if (localStorage.volume){
        sliderValue=localStorage.getItem("volume");
      }
      else {
        localStorage.setItem("volume", "1");
        sliderValue = localStorage.getItem("volume");
      }
     
      let x, y;
      let x2, y2;
      let currentEvent="menu";
      let pause=false;
      
      let audio = new Audio('music.mp3');

      let imgVolume = new Image();
      imgVolume.src = 'volume.png';
      let imgMuted = new Image();
      imgMuted.src = 'muted.png';

      
      let B = false;
      let N = false;
      let M = false;

      let rotated=new Array(2);
      rotated[0]="vertical";
      rotated[1]="vertical";
      
      let disabled=new Array(2);
      disabled[0]=false;
      disabled[1]=false;

      changingKey=-1;

      let colors = ["#dcb468", "#dc9cd0", "#b0589c", "#a0a034", "#90b4ec"];
      
      let interval = new Array(2);
      interval[0] = setInterval(function() {moveDown(0);}, 450);
      interval[1] = setInterval(function() {moveDown(1);}, 450);

      const grid = new Array(2);
      for (let k = 0; k < 2; k++){
        grid[k] = new Array(7);
        for (let i = 0; i < grid[k].length; i++) {
          grid[k][i] = new Array(18).fill("#000000");
        }
      }
      console.log(grid);

      //myArray[3][6]="#dc9cd0";
      //grid[3][6]=colors[Math.floor(Math.random() * 5)];

      blockPos=new Array(2);
      for(let k = 0; k<2; k++){
        blockPos[k]=new Array(2);
        for(let i = 0; i<3; i++){
          blockPos[k][i]=new Array(3);
        }
      }
      
      for(let k = 0; k<2; k++){
        for(let i = 0; i<3; i++){
          blockPos[k][i][2]=colors[Math.floor(Math.random() * 5)];
          //console.log(i);
        }
      }
      /*
      grid[2][15]="#dcb468";
      grid[2][16]="#dcb468";
      grid[2][17]="#dcb468";*/

      grid[0][5][15]="#dcb468";
      grid[0][5][16]="#dcb468";
      grid[0][5][17]="#b0589c";

      grid[1][2][15]="#dcb468";
      grid[1][2][16]="#dcb468";
      grid[1][2][17]="#b0589c";

      for(let k = 0; k<2; k++){
        blockPos[k][0][0]=3;
        blockPos[k][0][1]=-2;
        blockPos[k][1][0]=3;
        blockPos[k][1][1]=-1;
        blockPos[k][2][0]=3;
        blockPos[k][2][1]=0;
      }
      
      for(let k = 0; k<2; k++){
        for(let i = 0; i<3; i++){
          grid[0][blockPos[k][i][0]][blockPos[k][i][1]]=blockPos[k][i][2];
        }
      }
      window.requestAnimationFrame(Draw);


/*(function() {
  let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();*/

//event listener
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);  
  window.addEventListener("mousemove", moveCoordinates);
  window.addEventListener("click", clickCoordinates);
  canvas.addEventListener("mousedown", function (event) {
    if (currentEvent=="volume"){
      let mouseX = event.clientX - canvas.getBoundingClientRect().left;
      let mouseY = event.clientY - canvas.getBoundingClientRect().top;
      if (
          mouseX >= sliderX &&
          mouseX <= sliderX + sliderWidth &&
          mouseY >= sliderY &&
          mouseY <= sliderY + sliderHeight &&
          !(mouseX >= sliderX + (sliderWidth - handleWidth) * sliderValue &&
          mouseX <= sliderX + (sliderWidth - handleWidth) * sliderValue + handleWidth &&
          mouseY >= sliderY - handleHeight / 2 &&
          mouseY <= sliderY + handleHeight / 2)
      ) {
          sliderValue = Math.max(0, Math.min(1, (mouseX - sliderX) / sliderWidth));
          updateAudioVolume();
      } else if (
          mouseX >= sliderX + (sliderWidth - handleWidth) * sliderValue &&
          mouseX <= sliderX + (sliderWidth - handleWidth) * sliderValue + handleWidth &&
          mouseY >= sliderY - handleHeight / 2 &&
          mouseY <= sliderY + handleHeight / 2
      ) {
          isDragging = true;
      }
    }
  });
  document.addEventListener("mouseup", function () {
      isDragging = false;
  });

  function handleKeyDown(event) {
    
    if (currentEvent=="1player" || currentEvent=="2player"){
      if (!controls[0][1] && event.keyCode==controls[0][0]){
        Rotate(0);
        controls[0][1]=true;
      }
      if (!controls[1][1] && event.keyCode==controls[1][0]){
        changeColor(0);
        controls[1][1]=true;
      }
      if (!controls[2][1] && event.keyCode==controls[2][0]){
        moveLeft(0);
        controls[2][1]=true;
      }
      if (!controls[3][1] && event.keyCode==controls[3][0]){
        moveDown(0);
        fastInterval(0);
        controls[3][1]=true;
      }
      if (!controls[4][1] && event.keyCode==controls[4][0]){
        moveRight(0);
        controls[4][1]=true;
      }
      if (currentEvent=="2player"){
        if (!controls[5][1] && event.keyCode==controls[5][0]){
          Rotate(1);
          controls[5][1]=true;
        }
        if (!controls[6][1] && event.keyCode==controls[6][0]){
          changeColor(1);
          controls[6][1]=true;
        }
        if (!controls[7][1] && event.keyCode==controls[7][0]){
          moveLeft(1);
          controls[7][1]=true;
        }
        if (!controls[8][1] && event.keyCode==controls[8][0]){
          moveDown(1);
          fastInterval(1);
          controls[8][1]=true;
        }
        if (!controls[9][1] && event.keyCode==controls[9][0]){
          moveRight(1);
          controls[9][1]=true;
      }
      }
      if (!controls[11][1] && event.keyCode==controls[11][0]){
        if (pause==false){
          pauseGame();
          pause=true;
        }
        else if (pause==true){
          resumeGame();
          pause=false;
        }
        console.log("hasjidaskd");
        controls[11][1]=true;
      }
    }
    else if (currentEvent=="controls"){
      if (changingKey!=-1){
        let existingKey=false;
        for (let i = 0; i < controls.length; i++){
          if (controls[i][0]==event.keyCode && i!=changingKey){
            existingKey=true;
            break;
          }
        }
        if (!existingKey){
          controls[changingKey][0]=event.keyCode;
          localStorage.setItem(controls[changingKey][2], event.keyCode);
          changingKey=-1;
          resetClick();
        }
        
      }
      if (!controls[10][1] && event.keyCode==controls[10][0]){
        currentEvent="menu";
        controls[10][1]=true;
        resetClick();
      }
    } else if (currentEvent=="players" || currentEvent=="volume"){
      if (!controls[10][1] && event.keyCode==controls[10][0]){
        currentEvent="menu";
        controls[10][1]=true;
        resetClick();
      }
    }
    
    
    
    

    if (!B && event.keyCode==66){
      /*console.log("x: "+blockPos[0][0]+" y: "+blockPos[0][1]);
      console.log("x: "+blockPos[1][0]+" y: "+blockPos[1][1]);
      console.log("x: "+blockPos[2][0]+" y: "+blockPos[2][1]);*/
      //clearInterval(interval);
      B=true;
    }
    if (!N && event.keyCode==78){
      /*console.log(blockPos[0][2]);
      console.log(blockPos[1][2]);
      console.log(blockPos[2][2]);*/
      //interval = setInterval(moveDown, 450);
      N=true;
    }
    if (!M && event.keyCode==77){
      console.log(grid);
      M=true;
    }
    updateAudioVolume();
    audio.play();
    event.preventDefault();
  }

  function handleKeyUp() {
    controls[0][1]=false;
    controls[1][1]=false;
    controls[2][1]=false;
    if (controls[3][1] && event.keyCode==controls[3][0]){
      normalInterval(0);
      controls[3][1]=false;
    }
    controls[4][1]=false;
    
    controls[5][1]=false;
    controls[6][1]=false;
    controls[7][1]=false;
    if (controls[8][1] && event.keyCode==controls[8][0]){
      normalInterval(1);
      controls[8][1]=false;
    }
    controls[9][1]=false;

    controls[10][1]=false;
    controls[11][1]=false;

    B=false;
    N=false;
    M=false;
    
    
  }

  function fastInterval(p){
    clearInterval(interval[p]);
    interval[p] = setInterval(() => moveDown(p), 130);
    //interval = setInterval(moveDown, 130);
  }
  function normalInterval(p){
    clearInterval(interval[p]);
    interval[p] = setInterval(() => moveDown(p), 450);
    //interval = setInterval(moveDown, 450);
  }

  function pauseGame(){
    clearInterval(interval[0]);
    clearInterval(interval[1]);
  }
  function resumeGame(){
    interval[0] = setInterval(() => moveDown(0), 450);
    interval[1] = setInterval(() => moveDown(1), 450);
  }

//window.requestAnimationFrame(drawMenu);
//main animation function


function moveCoordinates(event){
  let rect = canvas.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;

  if (isDragging && currentEvent=="volume") {
      let mouseX = event.clientX - canvas.getBoundingClientRect().left;
      sliderValue = Math.max(0, Math.min(1, (mouseX - sliderX) / sliderWidth));
      updateAudioVolume();
  }
}

function clickCoordinates(event){
  let rect = canvas.getBoundingClientRect();
  x2 = event.clientX - rect.left;
  y2 = event.clientY - rect.top;

  updateAudioVolume();
  audio.play();
}
function resetClick(){
  x2=0;
  y2=0;
}

function Draw() {
  let canvas = document.getElementById("myCanvas");
  let c = canvas.getContext("2d");
  
  c.clearRect(0, 0, 850, 640);
  c.font = "50px myFont";

  if (currentEvent=="menu"){
    c.font = "100px myFont";
    c.fillStyle="#dcb468";
    c.fillText("ACID DROP", 82, 108);
    
    c.font = "50px myFont";
    
    if (x > 260 && x < 260+330 && y > 195 && y < 195+70){
      c.fillStyle="#203161";
    }
    else c.fillStyle="#3854a8";
    c.fillRect(260, 195, 330, 70);
    
    if (x > 260 && x < 260+330 && y > 285 && y < 285+70){
      c.fillStyle="#203161";
    }
    else c.fillStyle="#3854a8";
    c.fillRect(260, 285, 330, 70);

    if (x > 260 && x < 260+330 && y > 375 && y < 375+70){
      c.fillStyle="#203161";
    }
    else c.fillStyle="#3854a8";
    c.fillRect(260, 375, 330, 70);

    
    c.fillStyle="#dcb468";
    c.fillText("PLAY", 354, 248);
    c.fillText("CONTROLS", 276, 338);
    c.fillText("VOLUME", 315, 428);

    if (x2 > 260 && x2 < 260+330 && y2 > 195 && y2 < 195+70){
      currentEvent="players";
    }
    if (x2 > 260 && x2 < 260+330 && y2 > 285 && y2 < 285+70){
      currentEvent="controls";
    }
    if (x2 > 260 && x2 < 260+330 && y2 > 375 && y2 < 375+70){
      currentEvent="volume";
    }

    
    resetClick();
  }
  else if (currentEvent=="players"){
    if (x > 260 && x < 260+330 && y > 240 && y < 240+70){
      c.fillStyle="#203161";
    }
    else c.fillStyle="#3854a8";
    c.fillRect(260, 240, 330, 70);

    if (x > 260 && x < 260+330 && y > 330 && y < 330+70){
      c.fillStyle="#203161";
    }
    else c.fillStyle="#3854a8";
    c.fillRect(260, 330, 330, 70);



    c.fillStyle="#dcb468";
    c.fillText("1-player", 284, 293);
    c.fillText("2-player", 284, 383);
    if (x2 > 260 && x2 < 260+330 && y2 > 240 && y2 < 240+70){
      currentEvent="1player";
    }

    if (x2 > 260 && x2 < 260+330 && y2 > 330 && y2 < 330+70){
      currentEvent="2player";
    }
    
    
    /*
    if (x2 > 260 && x2 < 260+330 && y2 > 195 && y2 < 195+70){
      currentEvent="1player";
    }
    if (x2 > 260 && x2 < 260+330 && y2 > 285 && y2 < 285+70){
      currentEvent="2player";
    }
    */
    resetClick();
  }
  else if (currentEvent=="controls"){
    let xss=10;
    c.fillStyle="#203161";
    c.fillRect(135, 165, 70, 70);
    c.fillRect(225, 165, 70, 70);
    c.fillRect(90, 255, 70, 70);
    c.fillRect(180, 255, 70, 70);
    c.fillRect(270, 255, 70, 70);

    c.fillRect(549, 165, 70, 70);
    c.fillRect(639, 165, 70, 70);
    c.fillRect(504, 255, 70, 70);
    c.fillRect(594, 255, 70, 70);
    c.fillRect(684, 255, 70, 70);

    c.fillRect(344, 490, 70, 70);
    c.fillRect(436, 490, 70, 70);
    
    c.fillStyle="#dcb468";
    c.fillText("Player 1", 71, 83);
    c.fillText("Player 2", 485, 83);
    c.fillText("OTHER CONTROLS", 164, 453);

    
    c.font = "16px myFont";
    c.fillText("CHANGE", 132, 135);
    c.fillText("SHAPE", 140, 155);
    c.fillText("CHANGE", 224, 135);
    c.fillText("COLOR", 230, 155);
    c.fillText("LEFT", 105, 346);
    c.fillText("DOWN", 190, 346);
    c.fillText("RIGHT", 277, 346);

    c.fillText("CHANGE", 546, 135);
    c.fillText("SHAPE", 554, 155);
    c.fillText("CHANGE", 638, 135);
    c.fillText("COLOR", 644, 155);
    c.fillText("LEFT", 519, 346);
    c.fillText("DOWN", 604, 346);
    c.fillText("RIGHT", 691, 346);
    
    c.fillText("BACK", 355, 581);
    c.fillText("PAUSE", 440, 581);

    c.font = "50px myFont";
    c.fillText(String.fromCharCode(controls[0][0]), 153, 217);
    c.fillText(String.fromCharCode(controls[1][0]), 243, 217);
    c.fillText(String.fromCharCode(controls[2][0]), 108, 307);
    c.fillText(String.fromCharCode(controls[3][0]), 198, 307);
    c.fillText(String.fromCharCode(controls[4][0]), 288, 307);

    c.fillText(String.fromCharCode(controls[5][0]), 153+414, 217);
    c.fillText(String.fromCharCode(controls[6][0]), 243+414, 217);
    c.fillText(String.fromCharCode(controls[7][0]), 108+414, 307);
    c.fillText(String.fromCharCode(controls[8][0]), 198+414, 307);
    c.fillText(String.fromCharCode(controls[9][0]), 288+414, 307);

    c.fillText("P", 454, 540);
    c.font = "24px myFont";
    c.fillText("ESC", 354, 534);

    c.fillStyle="#203161";
    if (x2 > 135 && x2 < 135+70 && y2 > 165 && y2 < 165+70){
      c.fillRect(135, 165, 70, 70);
      changingKey=0;
    }
    else if (x2 > 225 && x2 < 225+70 && y2 > 165 && y2 < 165+70){
      c.fillRect(225, 165, 70, 70);
      changingKey=1;
    }
    else if (x2 > 90 && x2 < 90+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(90, 255, 70, 70);
      changingKey=2;
    }
    else if (x2 > 180 && x2 < 180+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(180, 255, 70, 70);
      changingKey=3;
    }
    else if (x2 > 270 && x2 < 270+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(270, 255, 70, 70);
      changingKey=4;
    }
    else if (x2 > 549 && x2 < 549+70 && y2 > 165 && y2 < 165+70){
      c.fillRect(549, 165, 70, 70);
      changingKey=5;
    }
    else if (x2 > 639 && x2 < 639+70 && y2 > 165 && y2 < 165+70){
      c.fillRect(639, 165, 70, 70);
      changingKey=6;
    }
    else if (x2 > 504 && x2 < 504+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(504, 255, 70, 70);
      changingKey=7;
    }
    else if (x2 > 594 && x2 < 594+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(594, 255, 70, 70);
      changingKey=8;
    }
    else if (x2 > 684 && x2 < 684+70 && y2 > 255 && y2 < 255+70){
      c.fillRect(684, 255, 70, 70);
      changingKey=9;
    }
    else changingKey=-1;
    
    /*else if (x2 > 344 && x2 < 344+70 && y2 > 490 && y2 < 490+70){
      c.fillRect(344, 490, 70, 70);
    }
    else if (x2 > 436 && x2 < 436+70 && y2 > 490 && y2 < 490+70){
      c.fillRect(436, 490, 70, 70);
    }*/


    //console.log(changingKey);
    
  }
  else if (currentEvent=="volume"){
    //c.fillStyle="#203161";
    //c.fillRect(135, 245, 150, 150);
    if (sliderValue>0){
      c.drawImage(imgVolume, 150, 270, 100, 100);
    }
    else c.drawImage(imgMuted, 150, 270, 100, 100);
    updateAudioVolume();
    drawSlider(c);
    drawHandle(c);
    c.font = "30px myFont";
    c.fillText(Math.ceil(sliderValue*100), 634, 328);
    
  }
  else if (currentEvent=="1player"){
    c.fillStyle="#000000";
    c.fillRect(250, 50, 350, 540);

    for (let i=0; i<7; i++){
      for (let j=0; j<18; j++){
      c.fillStyle = grid[0][i][j];
      c.fillRect(i*50+250, (j*30)+10+50, 50, 20);
      }
    }
    
    c.fillStyle="#dcb468";
    c.font = "40px myFont";
    let nicle='';
    for (let h=0; h<6-numLength(score[0]); h++){
      nicle+='0';
    }
    c.fillText(nicle+score[0].toString(), 333, 39);


    if (blockPos[0][2][1]==17 || (grid[0][blockPos[0][2][0]][blockPos[0][2][1]+1]!="#000000" && rotated[0]=="vertical") || (grid[0][blockPos[0][0][0]][blockPos[0][0][1]+1]!="#000000" && grid[0][blockPos[0][1][0]][blockPos[0][1][1]+1]!="#000000" && grid[0][blockPos[0][2][0]][blockPos[0][2][1]+1]!="#000000" && rotated[0]=="horizontal")){
      checkNewCombo(0);
      normalInterval(0);
      createNewBlock(0);
      rotated[0]="vertical";
      disabled[0]=false;
    }
  }
  else if (currentEvent=="2player"){
    c.fillStyle="#000000";
    c.fillRect(50, 50, 350, 540);
    c.fillRect(450, 50, 350, 540);

    for (let k=0; k<2; k++){
      for (let i=0; i<7; i++){
        for (let j=0; j<18; j++){
          c.fillStyle = grid[k][i][j];
          c.fillRect(i*50+50+k*400, (j*30)+10+50, 50, 20);
        }
      }
    }
    
    c.fillStyle="#dcb468";
    c.font = "40px myFont";
    let nicle='';
    for (let h=0; h<6-numLength(score[0]); h++){
      nicle+='0';
    }
    c.fillText(nicle+score[0].toString(), 133, 39);
    nicle='';
    for (let h=0; h<6-numLength(score[1]); h++){
      nicle+='0';
    }
    c.fillText(nicle+score[1].toString(), 533, 39);

    if (blockPos[0][2][1]==17 || (grid[0][blockPos[0][2][0]][blockPos[0][2][1]+1]!="#000000" && rotated[0]=="vertical") || (grid[0][blockPos[0][0][0]][blockPos[0][0][1]+1]!="#000000" && grid[0][blockPos[0][1][0]][blockPos[0][1][1]+1]!="#000000" && grid[0][blockPos[0][2][0]][blockPos[0][2][1]+1]!="#000000" && rotated[0]=="horizontal")){
      checkNewCombo(0);
      normalInterval(0);
      createNewBlock(0);
      rotated[0]="vertical";
      disabled[0]=false;
    }

    if (blockPos[1][2][1]==17 || (grid[1][blockPos[1][2][0]][blockPos[1][2][1]+1]!="#000000" && rotated[1]=="vertical") || (grid[1][blockPos[1][0][0]][blockPos[1][0][1]+1]!="#000000" && grid[1][blockPos[1][1][0]][blockPos[1][1][1]+1]!="#000000" && grid[1][blockPos[1][2][0]][blockPos[1][2][1]+1]!="#000000" && rotated[1]=="horizontal")){
      checkNewCombo(1);
      normalInterval(1);
      createNewBlock(1);
      rotated[1]="vertical";
      disabled[1]=false;
    }
  }
  window.requestAnimationFrame(Draw);
}

function checkNewCombo(p){ 
  for(let n=0; n<3; n++){
    if (grid[p][blockPos[p][n][0]][blockPos[p][n][1]]!="#000000"){
      leftValues=0;
      for(let i=blockPos[p][n][0]-1; i>=0; i--){
        if(grid[p][blockPos[p][n][0]][blockPos[p][n][1]]==grid[p][i][blockPos[p][n][1]]){
          leftValues++;
        }
        else break;
      }

      rightValues=0;
      for(let i=blockPos[p][n][0]+1; i<=6; i++){
        if(grid[p][blockPos[p][n][0]][blockPos[p][n][1]]==grid[p][i][blockPos[p][n][1]]){
          rightValues++;
        }
        else break;
      }

      aboveValues=0;
      for(let i=blockPos[p][n][1]-1; i>=0; i--){
        if(grid[p][blockPos[p][n][0]][blockPos[p][n][1]]==grid[p][blockPos[p][n][0]][i]){
          aboveValues++;
        }
        else break;
      }

      belowValues=0;
      for(let i=blockPos[p][n][1]+1; i<=17; i++){
        if(grid[p][blockPos[p][n][0]][blockPos[p][n][1]]==grid[p][blockPos[p][n][0]][i]){
          belowValues++;
        }
        else break;
      }
      
      if (leftValues+rightValues+1>=3){
        for(let i=blockPos[p][n][0]-leftValues; i<=blockPos[p][n][0]+rightValues; i++){
          grid[p][i][blockPos[p][n][1]]="#000000";
          k=1;
          while(grid[p][i][blockPos[p][n][1]-k]!="#000000"){
            grid[p][i][blockPos[p][n][1]-k+1]=grid[p][i][blockPos[p][n][1]-k];
            k++;
            if (grid[p][i][blockPos[p][n][1]-k]=="#000000"){
              grid[p][i][blockPos[p][n][1]-k+1]="#000000";
              break;
            }
          }
          //console.log("horizontalno"+(leftValues+rightValues+1));
        }
      }
      
      if (aboveValues+belowValues+1>=3){
        for(let i=blockPos[p][n][1]-aboveValues; i<=blockPos[p][n][1]+belowValues; i++){
          grid[p][blockPos[p][n][0]][i]="#000000";
          k=1;
          while (grid[p][blockPos[p][n][0]][i-k]!="#000000"){
            grid[p][blockPos[p][n][0]][i-k+1]=grid[p][blockPos[p][n][0]][i-k];
            k++;
            if (grid[p][blockPos[p][n][0]][i-k]=="#000000"){
              grid[p][blockPos[p][n][0]][i-k+1]="#000000";
              break;
            }
          }
          //console.log("vertikalno"+(aboveValues+belowValues+1));
        }
      }



      
    }
  }
}

function createNewBlock(p){
  for(let i = 0; i<3; i++){
    blockPos[p][i][2]=colors[Math.floor(Math.random() * 5)];
    //console.log(i);
  }
  blockPos[p][0][0]=3;
  blockPos[p][0][1]=-2;
  blockPos[p][1][0]=3;
  blockPos[p][1][1]=-1;
  blockPos[p][2][0]=3;
  blockPos[p][2][1]=0;
}

function moveRight(p){
  if (blockPos[p][0][0]!=6 && blockPos[p][1][0]!=6 && blockPos[p][2][0]!=6 && checkRight(p) && !disabled[p]){
    for(let i = 0; i<3; i++){
      let tempColor = blockPos[p][i][2];
      grid[p][blockPos[p][i][0]][blockPos[p][i][1]]="#000000";
      blockPos[p][i][0]++;
      grid[p][blockPos[p][i][0]][blockPos[p][i][1]]=tempColor;
    }
  }
}

function moveLeft(p){
  if (blockPos[p][0][0]!=0 && blockPos[p][1][0]!=0 && blockPos[p][2][0]!=0 && checkLeft(p) && !disabled[p]){
    if (rotated[p]=="vertical"){
      for(let i = 0; i<3; i++){
        let tempColor = blockPos[p][i][2];
        grid[p][blockPos[p][i][0]][blockPos[p][i][1]]="#000000";
        blockPos[p][i][0]--;
        grid[p][blockPos[p][i][0]][blockPos[p][i][1]]=tempColor;
      }
    }
    else if (rotated[p]=="horizontal"){
      for(let i = 2; i>=0; i--){
        let tempColor = blockPos[p][i][2];
        grid[p][blockPos[p][i][0]][blockPos[p][i][1]]="#000000";
        blockPos[p][i][0]--;
        grid[p][blockPos[p][i][0]][blockPos[p][i][1]]=tempColor;
      }
    }
    
  }
}
function changeColor(p){
  if (!disabled[p]){
    let tempColor=blockPos[p][0][2];
    blockPos[p][0][2]=blockPos[p][1][2];
    blockPos[p][1][2]=blockPos[p][2][2];
    blockPos[p][2][2]=tempColor;

    grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=blockPos[p][0][2];
    grid[p][blockPos[p][1][0]][blockPos[p][1][1]]=blockPos[p][1][2];
    grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=blockPos[p][2][2];
  }
  
}

function Rotate(p){
  if (rotated[p]=="vertical"){
    if (blockPos[p][1][0]!=0 && blockPos[p][1][0]!=6 && grid[p][blockPos[p][1][0]-1][blockPos[p][1][1]]=="#000000" && grid[p][blockPos[p][1][0]+1][blockPos[p][1][1]]=="#000000"){
      tempColor=blockPos[p][0][2];
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]="#000000";
      blockPos[p][0][0]++;
      blockPos[p][0][1]++;
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=tempColor;
      
      tempColor=blockPos[p][2][2];
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]="#000000";
      blockPos[p][2][0]--;
      blockPos[p][2][1]--;
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=tempColor;

      rotated[p]="horizontal";
    }
  }
  else if (rotated[p]=="horizontal"){
    if (blockPos[p][1][0]!=0 && blockPos[p][1][0]!=6 && blockPos[p][1][1]!=17){
      tempColor=blockPos[p][0][2];
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]="#000000";
      blockPos[p][0][0]--;
      blockPos[p][0][1]--;
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=tempColor;
      
      tempColor=blockPos[p][2][2];
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]="#000000";
      blockPos[p][2][0]++;
      blockPos[p][2][1]++;
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=tempColor;

      tempColor2=blockPos[p][0][2];
      blockPos[p][0][2]=blockPos[p][2][2];
      blockPos[p][2][2]=tempColor2;

      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=blockPos[p][0][2];
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=blockPos[p][2][2];

      rotated[p]="vertical";
    }
  }
}

function moveDown(p){
  if ((grid[p][blockPos[p][0][0]][blockPos[p][0][1]+1]!="#000000" || grid[p][blockPos[p][1][0]][blockPos[p][1][1]+1]!="#000000" || grid[p][blockPos[p][2][0]][blockPos[p][2][1]+1]!="#000000") && rotated[p]=="horizontal"){
    if (grid[p][blockPos[p][0][0]][blockPos[p][0][1]+1]=="#000000"){
      tempColor=blockPos[p][0][2];
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]="#000000";
      blockPos[p][0][1]++;
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=tempColor;
      disabled[p]=true;
    }
    if (grid[p][blockPos[p][1][0]][blockPos[p][1][1]+1]=="#000000"){
      tempColor=blockPos[p][1][2];
      grid[p][blockPos[p][1][0]][blockPos[p][1][1]]="#000000";
      blockPos[p][1][1]++;
      grid[p][blockPos[p][1][0]][blockPos[p][1][1]]=tempColor;
      disabled[p]=true;
    }
    if (grid[p][blockPos[p][2][0]][blockPos[p][2][1]+1]=="#000000"){
      tempColor=blockPos[p][2][2];
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]="#000000";
      blockPos[p][2][1]++;
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=tempColor;
      disabled[p]=true;
    }
  }
  else if (blockPos[p][1][1]!=17 && blockPos[p][2][1]!=17){
    if (rotated[p]=="vertical"){
      blockPos[p][2][1]++;
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=blockPos[p][2][2];
      blockPos[p][1][1]++;
      grid[p][blockPos[p][1][0]][blockPos[p][1][1]]=blockPos[p][1][2];
      blockPos[p][0][1]++;
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=blockPos[p][0][2];
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]-1]="#000000";
    }
    else if (rotated[p]=="horizontal"){
      blockPos[p][2][1]++;
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]]=blockPos[p][2][2];
      grid[p][blockPos[p][2][0]][blockPos[p][2][1]-1]="#000000";
      
      blockPos[p][1][1]++;
      grid[p][blockPos[p][1][0]][blockPos[p][1][1]]=blockPos[p][1][2];
      grid[p][blockPos[p][1][0]][blockPos[p][1][1]-1]="#000000";
      
      blockPos[p][0][1]++;
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]]=blockPos[p][0][2];
      grid[p][blockPos[p][0][0]][blockPos[p][0][1]-1]="#000000";
    }
  }
}

function checkLeft(p){
  if (rotated[p]=="vertical") return grid[p][blockPos[p][0][0]-1][blockPos[p][0][1]]=="#000000" && grid[p][blockPos[p][1][0]-1][blockPos[p][1][1]]=="#000000" && grid[p][blockPos[p][2][0]-1][blockPos[p][2][1]]=="#000000";
  else if (rotated[p]=="horizontal") return grid[p][blockPos[p][2][0]-1][blockPos[p][2][1]]=="#000000";
}

function checkRight(p){
  if (rotated[p]=="vertical") return grid[p][blockPos[p][0][0]+1][blockPos[p][0][1]]=="#000000" && grid[p][blockPos[p][1][0]+1][blockPos[p][1][1]]=="#000000" && grid[p][blockPos[p][2][0]+1][blockPos[p][2][1]]=="#000000";
  else if (rotated[p]=="horizontal") return grid[p][blockPos[p][0][0]+1][blockPos[p][0][1]]=="#000000";
}

function setControls(){
  if (localStorage.cs1){
  controls[0][0]=localStorage.getItem("cs1");
  }
  else {
    localStorage.setItem("cs1", "87");
    controls[0][0]=localStorage.getItem("cs1");
  }
  if (localStorage.cc1){
  controls[1][0]=localStorage.getItem("cc1");
  }
  else {
    localStorage.setItem("cc1", "69");
    controls[1][0]=localStorage.getItem("cc1");
  }
  
  if (localStorage.l1){
  controls[2][0]=localStorage.getItem("l1");
  }
  else {
    localStorage.setItem("l1", "65");
    controls[2][0]=localStorage.getItem("l1");
  }

  if (localStorage.d1){
  controls[3][0]=localStorage.getItem("d1");
  }
  else {
    localStorage.setItem("d1", "83");
    controls[3][0]=localStorage.getItem("d1");
  }

  if (localStorage.r1){
  controls[4][0]=localStorage.getItem("r1");
  }
  else {
    localStorage.setItem("r1", "68");
    controls[4][0]=localStorage.getItem("r1");
  }

  if (localStorage.cs2){
  controls[5][0]=localStorage.getItem("cs2");
  }
  else {
    localStorage.setItem("cs2", "73");
    controls[5][0]=localStorage.getItem("cs2");
  }
  if (localStorage.cc2){
  controls[6][0]=localStorage.getItem("cc2");
  }
  else {
    localStorage.setItem("cc2", "79");
    controls[6][0]=localStorage.getItem("cc2");
  }
  if (localStorage.l2){
  controls[7][0]=localStorage.getItem("l2");
  }
  else {
    localStorage.setItem("l2", "74");
    controls[7][0]=localStorage.getItem("l2");
  }
  if (localStorage.d2){
  controls[8][0]=localStorage.getItem("d2");
  }
  else {
    localStorage.setItem("d2", "75");
    controls[8][0]=localStorage.getItem("d2");
  }
  if (localStorage.r2){
  controls[9][0]=localStorage.getItem("r2");
  }
  else {
    localStorage.setItem("r2", "76");
    controls[9][0]=localStorage.getItem("r2");
  }
  if (localStorage.esc){
  controls[10][0]=localStorage.getItem("esc");
  }
  else {
    localStorage.setItem("esc", "27");
    controls[10][0]=localStorage.getItem("esc");
  }
  if (localStorage.pause){
  controls[11][0]=localStorage.getItem("pause");
  }
  else {
    localStorage.setItem("pause", "80");
    controls[11][0]=localStorage.getItem("pause");
  }


  controls[0][2]="cs1";
  controls[1][2]="cc1";
  controls[2][2]="l1";
  controls[3][2]="d1";
  controls[4][2]="r1";

  controls[5][2]="cs2";
  controls[6][2]="cc2";
  controls[7][2]="l2";
  controls[8][2]="d2";
  controls[9][2]="r2";
}

function drawSlider(c) {
    c.fillStyle = "#203161";
    c.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);
}
function drawHandle(c) {
    c.fillStyle = "#dcb468";
    c.fillRect(sliderX + (sliderWidth - handleWidth) * sliderValue, sliderY - handleHeight / 2, handleWidth, handleHeight);
}
function updateAudioVolume() {
    audio.volume = sliderValue;
    localStorage.setItem("volume", sliderValue);
}

function numLength(number) {
    return number.toString().length;
}