//Global Variables
var compClicks = [];
var strict = 0;
var playerClicks = [];
var count = 0;
var compClicksObj = {};
var resetButton = 0;
var eightiesSoundClips = 0;
// Default Audio Sounds
var greenAudio = document.getElementById('green-audio');
var redAudio = document.getElementById('red-audio');
var yellowAudio = document.getElementById('yellow-audio');
var blueAudio = document.getElementById('blue-audio');
const allColorButtonAudio = document.getElementsByClassName('color-button-audio');
var normalMistakeSound = document.getElementById('normal-mistake-sound');
var gameLoseSound = document.getElementById('game-lose-sound');
var gameWinSound = document.getElementById('game-win-sound');
var roundWinSound = document.getElementById('round-win-sound');

// Game starts with strict button active
$("#start").on('click', function() {
    startGame();
});
$("#strict").on('click', function() {
    strictMode();
});
$("#reset").on('click', function() {
    resetButton = 1;
    resetGame();
});
$("#eighties-sound-clips").on('click', toggleEightiesSound);

// Starts game, adds event listener to simon color buttons
function startGame() {
    $('#start').prop('disabled', true);
    randGenerator();
}

// Generators a random array for computer moves
function randGenerator() {
    count++;
    playerClicks = [];
    if (count === 20) {
        gameOver();
        return;
    }
    $("#turn-num").val(count);
    compClicks.push(Math.floor((Math.random() * 4) + 1));

    compClicksObj = {};
    compClicksObj.clicks = compClicks;
    compClicksObj.identity = "computer";
    buttonLightUp(compClicksObj);
    return;
}

// Takes comp clicks from randomly generated comp array and collects players clicks in array.
// Compares player clicks to comp clicks then returns incorrect or correct 
function playerInput(compClicks) {
    // player input array equals computer array
    var roundWin = [];
    roundWin = compClicks.filter(function(curElem, ind) {
        return playerClicks[ind] !== compClicks[ind];
    });
    if (roundWin.length === 0) {
        playerClicks = [];
        setTimeout(function() {
            roundWinSound.load();
            roundWinSound.play();
        }, 1000);
        setTimeout(randGenerator, 2000);
        return;
    }

    // Detects wrong player click
    for (var i = 0; i < playerClicks.length; i++) {
        if (playerClicks[i] !== compClicks[i]) {
            // Play "wrong button" sound and display error in Count element         
            $("#turn-num").val("OOOPS!");
            $('.color-buttons').off('click');
            for (var j = 0; j < allColorButtonAudio.length; j++) {
                allColorButtonAudio[j].pause();
            }
            normalMistakeSound.load();
            normalMistakeSound.play();
            setTimeout(function() {
                if (strict === 1) {
                    //Displays game over here
                    gameLoseSound.load();
                    gameLoseSound.play();
                    $("#turn-num").val("Game Over =(");
                    setTimeout(resetGame, 3800);
                    return;
                }
                $("#turn-num").val(count);
                // Deletes player clicks array
                playerClicks = [];
                // Replays button sequence
                buttonLightUp(compClicksObj);
            }, 2000);
            return;
        }
    }
    return;
}

// Sets gameplay to "strict" mode
function strictMode() {
    if (strict === 0) {
        strict = 1;
        $('#strict').css("background-color", "red");
        return;
    } else strict = 0;
    $('#strict').css("background-color", "blue");
    return;
}

// resets game
function resetGame() {
    $('.all-buttons').prop('disabled', false);
    $('.color-buttons').off('click');
    playerClicks = [];
    compClicks = [];
    count = 0;
    $("#turn-num").val("Press start!");
    strict = 0;
    $('#strict').css("background-color", "blue");
    resetButton = 0;
    eightiesSoundClips = 1;
    toggleEightiesSound();
    return;
}

// Game Over / Display victory screen and disable buttons
function gameOver() {
    setTimeout(function() {
        $("#turn-num").val("You Win!!!");
        $(".all-buttons").prop('disabled', true);
        gameWinSound.load();
        gameWinSound.play();
        //victoryAnimation(); // Put victory animation in later
        setTimeout(resetGame, 13000);
    }, 800);
    return;
}

// Simon color buttons light up

function buttonLightUp(clicksArr) {
    if (clicksArr.identity === "computer") {
        compButtonLights(0, clicksArr.clicks.length, clicksArr.clicks);
    } else {
        switch (clicksArr[clicksArr.length - 1]) {
            case 1:
                $("#green").css("background", "green");
                greenAudio.load();
                greenAudio.play();
                $('.color-buttons').off('click');
                setTimeout(function() {
                    $("#green").css("background", "#006400");
                    enablePlayerButtons();
                }, 1000);
                break;
            case 2:
                $("#red").css("background", "red");
                redAudio.load();
                redAudio.play();
                $('.color-buttons').off('click');
                setTimeout(function() {
                    $("#red").css("background", "#8B0000");
                    enablePlayerButtons();
                }, 1000);
                break;
            case 3:
                $("#yellow").css("background", "yellow");
                yellowAudio.load();
                yellowAudio.play();
                $('.color-buttons').off('click');
                setTimeout(function() {
                    $("#yellow").css("background", "#CCCC00");
                    enablePlayerButtons();
                }, 1000);
                break;
            case 4:
                $("#blue").css("background", "blue");
                blueAudio.load();
                blueAudio.play();
                $('.color-buttons').off('click');
                setTimeout(function() {
                    $("#blue").css("background", "#00008B");
                    enablePlayerButtons();
                }, 1000);
                break;
        }
    }
    return;
}

// Special function for computer button light up
function compButtonLights(inc, loopLnth, clicksArr) {
    if (resetButton === 1) {
        return;
    }
    // Turn color buttons off   
    $('.color-buttons').off('click');
    setTimeout(function() {
        switch (clicksArr[inc]) {
            case 1:
                $("#green").css("background", "green");
                greenAudio.load();
                greenAudio.play();
                setTimeout(function() {
                    $("#green").css("background", "#006400");
                }, 1000);
                break;
            case 2:
                $("#red").css("background", "red");
                redAudio.load();
                redAudio.play();
                setTimeout(function() {
                    $("#red").css("background", "#8B0000");
                }, 1000);
                break;
            case 3:
                $("#yellow").css("background", "yellow");
                yellowAudio.load();
                yellowAudio.play();
                setTimeout(function() {
                    $("#yellow").css("background", "#CCCC00");
                }, 1000);
                break;
            case 4:
                $("#blue").css("background", "blue");
                blueAudio.load();
                blueAudio.play();
                setTimeout(function() {
                    $("#blue").css("background", "#00008B");
                }, 1000);
                break;
        }
        inc++;
        if (inc < loopLnth) {
            compButtonLights(inc, loopLnth, clicksArr);
        } else {
            setTimeout(function() {
                enablePlayerButtons();
            }, 1500);
        }
    }, 1500);

    return;
}

function enablePlayerButtons() {

    // Turn color buttons back on    
    $("#green").click(function() {
        playerClicks.push(1);
        buttonLightUp(playerClicks);
        playerInput(compClicks);
    });
    $("#red").click(function() {
        playerClicks.push(2);
        buttonLightUp(playerClicks);
        playerInput(compClicks);
    });
    $("#yellow").click(function() {
        playerClicks.push(3);
        buttonLightUp(playerClicks);
        playerInput(compClicks);
    });
    $("#blue").click(function() {
        playerClicks.push(4);
        buttonLightUp(playerClicks);
        playerInput(compClicks);
    });
    return;
}

function toggleEightiesSound() {
    if (eightiesSoundClips === 0) {
        $('#eighties-sound-clips').html('Default Mode');
        eightiesSoundClips = 1;
        // Change button audio to eighties        
        greenAudio = document.getElementById('green-eighties-audio');
        redAudio = document.getElementById('red-eighties-audio');
        yellowAudio = document.getElementById('yellow-eighties-audio');
        blueAudio = document.getElementById('blue-eighties-audio');
        // Change other audio to eighties
        normalMistakeSound = document.getElementById('normal-mistake-eighties-sound');
        gameLoseSound = document.getElementById('game-lose-eighties-sound');
        gameWinSound = document.getElementById('game-win-eighties-sound');
        roundWinSound = document.getElementById('round-win-eighties-sound');
    } else {
        $('#eighties-sound-clips').html('True Survivor Mode');
        eightiesSoundClips = 0;
        // Change button audio back to default        
        greenAudio = document.getElementById('green-audio');
        redAudio = document.getElementById('red-audio');
        yellowAudio = document.getElementById('yellow-audio');
        blueAudio = document.getElementById('blue-audio');
        // Change other audio back to default   
        normalMistakeSound = document.getElementById('normal-mistake-sound');
        gameLoseSound = document.getElementById('game-lose-sound');
        gameWinSound = document.getElementById('game-win-sound');
        roundWinSound = document.getElementById('round-win-sound');
    }
    return;
}


// Victory animation (DO NOT DELETE; REPLACE WITH ACTUAL ANIMATION LATER)
/*
function victoryAnimation() {
    var elem = document.getElementById("victory-animation");
    var pos = 0;
    var id = setInterval(frame, 5);

    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}
*/