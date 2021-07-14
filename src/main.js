let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 5000
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;

//initialize variable for player
let player;
// initialize variable for Deck array
let cardDeck;

// intialize Music variable
let playBGM;
// initialize key values
let keySPACE, keyRIGHT, keyLEFT;

let selectedCounter, selectedCardList;
