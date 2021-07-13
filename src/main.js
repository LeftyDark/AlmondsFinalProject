let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;

// initialize variable for Deck array
let cardDeck;
<<<<<<< HEAD
// intialize Music variable
let playBGM;
// initialize key values
let keySPACE;
=======
let playBGM;
let selectedCounter;
>>>>>>> c5bb5d4d0cf083a06324c860dbd1a75c4e52397a
