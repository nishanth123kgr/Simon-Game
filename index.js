var colors = ['green', 'red', 'yellow', 'blue'], gamePattern = [], userClickedPattern = [], level = 0, x=0;


$(document).keypress(() => {
    if (level == 0)
        nextSequence();
})
$('.btn').click((event) => {
    userClickedPattern.push(event.target.id);
    animatePress(event.target.id);
    verify(event.target.id);
    

})
function verify(id){
    if((colors[gamePattern[x]]===id)&&(x<gamePattern.length))
    {
        x++;
        console.log('matches');
        press(id)
        if(x===gamePattern.length)
        {
            x=0;
            nextSequence();
            return;
        }
    }
    else{
        new Audio('./sounds/wrong.mp3').play();
        console.log("Game ended...");
        gamePattern=[];
        x=0;
        level=0;
        $('#level-title').text('Game Over, Press Any Key to Restart');
        gameOver();
    }
}

function gameOver() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 100);
      
}
function nextSequence() {
    setTimeout(()=>{randomColor = Math.floor(Math.random() * 4)
        level += 1;
        
        $('#level-title').text('Level ' + level);
        gamePattern.push(randomColor);
        press(colors[randomColor])}, 500);
    
}
function press(id) {
    $('.' + id).fadeOut(100).fadeIn(100);
    new Audio('./sounds/' + id + '.mp3').play();
   
}
function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('.' + currentColor).removeClass('pressed');
    }, 200);

}