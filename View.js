function View(canvas){
    this.canvas = canvas;
    this.clicks = [];
    this.framrate = 1000/33;
    this.firsttime = 0;
}

View.prototype.updateDisplay = function() {
    var view = this;
    
    var context = view.canvas.getContext("2d");
    context.clearRect(0,0, view.canvas.width, view.canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0,0, view.canvas.width, view.canvas.height);
    for (let index = 0; index<view.clicks.length; index++)
    {
        view.drawCircle(context, view.clicks[index].x, view.clicks[index].y, view.clicks[index].radius, view.clicks[index].alpha );
       
        view.clicks[index].radius+=0.4;
        view.clicks[index].alpha +=1;
    }
    
}

View.prototype.handleClick = function(event) {
    var view = this;
    var x = event.offsetX;
    var y = event.offsetY;
    var pos = view.clicks.push({x:x, y:y, radius:0, alpha:1});
    console.log("Putting the circle information into clicks");
    Audio.play(x%10);
    
    
    if (this.firsttime == 0)
    {
        document.getElementById("talker").innerHTML = "can I write a little song for you?";
        document.getElementById("fname").placeholder = "share...";
        document.getElementById("buttono").value = "click here when done. thank you";


        this.firsttime = 1;
    }
  
    this.updateDisplay();
};

View.prototype.createTune = async function(){
    var value = document.getElementById("fname").value;
    var view = this;
    console.log(value);
    notes = [];
    const delay = async (ms = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms));
    for (var i = 0; i < value.length; i++)
    {
        var wait = (250*Math.floor(Math.random()*4));
        await delay(wait);

        console.log("round 1");
        temp = value.charAt(i).charCodeAt(0);
        console.log(i);
        console.log(temp);
        console.log(parseInt(temp));
        randX = parseInt(temp)*Math.floor(Math.random()*10);
        randY = parseInt(temp)*Math.floor(Math.random()*5);//your code to be executed after 1 second
        view.clicks.push({x:randX, y:randY, radius:0, alpha:1}); 
        Audio.play(randX%10);

        console.log(view.clicks);  
    }
    this.updateDisplay();

//here we figure out how to turn text into an xy coordinate
//take a letter make it its number, multiply it by a random value between one and 50
//for y, multiply it by random value between one and 20
}

View.prototype.drawCircle = function(context, x, y, radius, alpha)
{
    context.beginPath();
    context.arc(x,y,radius, 0, 2*Math.PI);
    context.fillStyle = "rgba(" + x%256 + ", " + y%256 + ", " + (x*y %256) + ", "
    + alpha + ")";
    context.fill();
};