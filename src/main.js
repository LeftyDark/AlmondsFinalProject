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
// initialize variable for Deck array and hand stuff
let cardDeck, handSize, handList;
let card1, card2, card3, card4, card5;

//initialize variables for split card  and its functions
let isSplitting, splitNum, cardSelected;
// intialize Music variable
let playBGM;
// initialize key values
let keySPACE, keyRIGHT, keyLEFT, key1, key2, key3, key4, key5;

let selectedCounter, selectedCardList;
