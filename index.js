var colors = ['green', 'red', 'yellow', 'blue'], gamePattern = [], userClickedPattern = [], level = 0, x = 0, speed = 500;

$(document).keypress(() => {
    if (level == 0)
        nextSequence();
});

$('.btn').click((event) => {
    userClickedPattern.push(event.target.id);
    animatePress(event.target.id);
    verify(event.target.id);
});

function verify(id) {
    if ((colors[gamePattern[x]] === id) && (x < gamePattern.length)) {
        x++;
        console.log('matches');
        press(id);
        if (x === gamePattern.length) {
            x = 0;
            setTimeout(nextSequence, 1000);
            return;
        }
    } else {
        new Audio('./sounds/wrong.mp3').play();
        console.log("Game ended...");
        gamePattern = [];
        x = 0;
        level = 0;
        $('#level-title').text('Game Over, Press Any Key to Restart');
        gameOver();
    }
}

function gameOver() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
}

function nextSequence() {
    setTimeout(() => {
        randomColor = Math.floor(Math.random() * 4);
        level += 1;
        
        // Aggressive speed increase after level 6
        if (level > 6 && speed > 200) {
            speed -= 50; // Speed increases faster after level 6
        } else if (level > 10 && speed > 100) {
            speed -= 100; // After level 10, speed increases drastically
        }
        
        $('#level-title').text('Level ' + level);

        // Introduce distractions after level 8
        if (level > 8) {
            randomDistraction();
        }

        // Introduce unpredictability after level 10
        if (level > 10 && Math.random() > 0.5) {
            randomColor = Math.floor(Math.random() * 4); // Unpredictable behavior after level 10
        }

        gamePattern.push(randomColor);
        press(colors[randomColor]);
    }, speed);
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

function randomDistraction() {
    setTimeout(() => {
        var distractionColor = colors[Math.floor(Math.random() * 4)];
        press(distractionColor);
        console.log("Distraction: " + distractionColor);
    }, Math.random() * 1000); // Distraction occurs at random times
}
