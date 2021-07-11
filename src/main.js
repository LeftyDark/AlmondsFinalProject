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

//initialize variable for Deck array
let cardDeck;
let menuBGM, playBGM;