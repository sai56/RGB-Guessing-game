let hard  = document.getElementById('hard');
let easy  = document.getElementById('easy');
let newg  = document.getElementById('newgame');
let top1  = document.getElementsByClassName('top')[0];
let message = document.getElementById('message');
let isEasy = true;

//function handles enabling the hard mode
let hardMode = function(){

  for(let i=0;i<3;i++){
    let newDiv1 =  document.createElement('div');
    newDiv1.setAttribute('class','col-lg-4');
    let div = document.createElement('div');
    div.setAttribute('id','option'+(i+4));
    newDiv1.appendChild(div);
    let row = document.getElementsByClassName("row")[0];
    row.appendChild(newDiv1);
  }
  isEasy = false;
};


//function handles enabling the easy mode
let easyMode = function(){
  for(let i=0;i<3;i++){
    let remDiv = document.getElementById("option"+(i+4));
    if(remDiv!=null){
      remDiv.parentNode.removeChild(remDiv);
    }
  }
  isEasy = true;

}


//adding a listener for enabling the hard mode
hard.addEventListener("click",function(){
  if(isEasy){
    this.style.background="#1e5cbf";
    this.style.color="white";
    easy.style.background="white";
    easy.style.color="#1e5cbf";
    hardMode();
    newGame();
  }
})


////adding a listener for enabling the easy mode
easy.addEventListener("click",function(){
  if(!isEasy){
    this.style.background="#1e5cbf";
    this.style.color="white";
    hard.style.background="white";
    hard.style.color="#1e5cbf";
    easyMode();
    newGame();
  }
})


//function for setting the options for colors and the correct option depending on the mode of play(numOfOptions)
let helper = function(numOfOptions){

  //array for random options for colors
  let options = [];

  //filling the options array with random colors
  for(let i=0;i<numOfOptions;i++){

    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    options.push({
      red:red,
      green:green,
      blue:blue,
    });

  }

  //Picking a random option number of the available numOfOptions
  let randOption = Math.floor(Math.random()*numOfOptions);

  //saving into correctVal the rgb values corresponding to randOption
  let correctVal = "rgb("+options[randOption].red+", "+options[randOption].green+", "+options[randOption].blue+") none repeat scroll 0% 0%"


  //setting the rgb value at the top
  let redVal = document.getElementById("red");
  redVal.textContent = options[randOption].red;
  let greenVal = document.getElementById("green");
  greenVal.textContent = options[randOption].green;
  let blueVal = document.getElementById("blue");
  blueVal.textContent = options[randOption].blue;


  //setting the color for the options and adding eventlisteners for the current game
  for(let i=0;i<numOfOptions;i++){

    let option = document.getElementById("option"+(i+1));
    option.style.background="rgb("+options[i].red+","+options[i].green+","+options[i].blue+")";

    option.addEventListener("click",function(){
      //console.log("CORRECT "+ correctVal);
      if(this.style.background===correctVal){

        top1.style.background = correctVal;

        message.textContent="Correct!";

        for(let i=0;i<numOfOptions;i++){
          let opt = document.getElementById("option"+(i+1));
          opt.style.display="block"
          opt.style.background = correctVal;
        }

        newg.textContent="PLAY AGAIN?";

      }
      else{
          message.textContent="Try Again";
          this.style.display="none";
      }

    });

  }

  //Removing the eventlisteners which were attached in the previous game
  /*for(let i=0;i<numOfOptions;i++){
    let option = document.getElementById("option"+(i+1));

    option.removeEventListener("click",function(){
        console.log("CORRECT "+ correctVal);
      if(this.style.background===correctVal){

        top1.style.background = correctVal;

        for(let i=0;i<numOfOptions;i++){
          let opt = document.getElementById("option"+(i+1));
          opt.display="block"
          opt.style.background = correctVal;
        }

        newg.textContent="PLAY AGAIN?";

      }
      else{

          this.style.display="none";

      }

    })
  }*/



}


let newGame = function(){

    top1.style.background="#1e5cbf";
    newg.textContent="NEW GAME";
    message.textContent="";

    if(isEasy){
      helper(3);
    }
    else{
      helper(6);
    }
}

newGame();

newg.addEventListener("click",function(){
  newGame();
})
