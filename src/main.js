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
//initialize variable for camera
let camera;
// initialize variable for Deck array and hand stuff
let cardDeck, deckText, handSize, handList, cardPosition;
let card1, card2, card3, card4, card5;
//initalize text stuff
let textConfig, splitTextConfig;
//initialize variables for split card  and its functions
let isSplitting, splitNum, cardSelected, splitText;
// intialize Music variable
let playBGM;
// initialize key values
let keySPACE, keyRIGHT, keyLEFT, key1, key2, key3, key4, key5;

let selectedCounter, selectedCardList;
