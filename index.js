var colors = ['green', 'red', 'yellow', 'blue'], gamePattern = [], userClickedPattern = [], level = 0, x = 0, speed = 500, reverseMode = false;

$(document).keypress(() => {
    if (level == 0) {
        reverseMode = false;
        nextSequence();
    }
});

$('.btn').click((event) => {
    userClickedPattern.push(event.target.id);
    animatePress(event.target.id);
    verify(event.target.id);
});

function verify(id) {
    let correctId = reverseMode ? colors[gamePattern[gamePattern.length - 1 - x]] : colors[gamePattern[x]];

    if ((correctId === id) && (x < gamePattern.length)) {
        x++;
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
        let randomColor = Math.floor(Math.random() * 4);
        level += 1;

        // Aggressively increase speed after level 6
        if (level > 6 && speed > 150) {
            speed -= 50;
        } else if (level > 10 && speed > 50) {
            speed -= 50; // Extremely fast after level 10
        }
        
        // Reverse mode after level 10
        if (level > 10) {
            reverseMode = true;
            $('#level-title').text('Level ' + level + ' (REVERSE MODE)');
        } else {
            $('#level-title').text('Level ' + level);
        }

        // Shuffle pattern slightly after level 7
        if (level > 7 && Math.random() > 0.5) {
            shufflePattern();
        }

        // Introduce multiple distractions starting from level 5
        if (level > 5) {
            randomDistractions();
        }

        // Add random rapid blinking from level 8
        if (level > 8) {
            blinkColors();
        }

        gamePattern.push(randomColor);
        press(colors[randomColor]);
    }, speed);
}

function press(id) {
    $('.' + id).fadeOut(50).fadeIn(50);
    new Audio('./sounds/' + id + '.mp3').play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('.' + currentColor).removeClass('pressed');
    }, 100);
}

function randomDistractions() {
    let distractionCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 distractions
    for (let i = 0; i < distractionCount; i++) {
        setTimeout(() => {
            let distractionColor = colors[Math.floor(Math.random() * 4)];
            press(distractionColor);
            console.log("Distraction: " + distractionColor);
        }, Math.random() * 500); // Distractions occur at random times
    }
}

function shufflePattern() {
    // Randomly shuffle a few elements in the existing pattern to confuse the player
    if (gamePattern.length > 3) {
        let shuffleIndex1 = Math.floor(Math.random() * gamePattern.length);
        let shuffleIndex2 = Math.floor(Math.random() * gamePattern.length);
        let temp = gamePattern[shuffleIndex1];
        gamePattern[shuffleIndex1] = gamePattern[shuffleIndex2];
        gamePattern[shuffleIndex2] = temp;
    }
}

function blinkColors() {
    let blinkCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 random blinks
    for (let i = 0; i < blinkCount; i++) {
        setTimeout(() => {
            let blinkColor = colors[Math.floor(Math.random() * 4)];
            $('.' + blinkColor).fadeOut(20).fadeIn(20);
            console.log("Blink: " + blinkColor);
        }, Math.random() * 500); // Blinks occur at random times
    }
}
