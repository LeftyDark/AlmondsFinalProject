class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {
        this.load.image('card', './assets/temp_card_30.png');
    }
    create() {
        cardDeck = [];
        this.add.text(game.config.width/2, game.config.height/2, 'Final Project')
        this.cardCreateSingle('positive', 'move3L');
    }
    update() {
        
    }
    determineCardType(type='none') {
        //When a new card is generated, decides what type of card is it.
        //A type can also be inputted initially to create a card of a specific type
        let typeNum = Phaser.Math.Between(1,8);
        if (type == 'move1L' || typeNum == 1) {
            return 'move1L'}
        if (type == 'move3L' || typeNum == 2) {
            return 'move3L'
        }
        if (type == 'move1R' || typeNum == 3) {
            return 'move1R'
        }
        if (type == 'move3R' || typeNum == 4) {
            return 'move3R'
        }
        if (type == 'jump' || typeNum == 5) {
            return 'jump'
        }
        if (type == 'enemy' || typeNum == 6) {
            return 'enemy'
        }
        if (type == 'attack' || typeNum == 7) {
            return 'attack'
        }
        if (type == 'split' || typeNum == 8) {
            return 'split'
        }
    }
    cardCreateSingle(charge, type='none') {
        //creates a card of a card type and charge that is not combined with any other cards
        let cardType = this.determineCardType(type);
        this.newCard = new Card(this, game.config.width/4, game.config.height-200, 'card', 0, cardType, charge, false);
        cardDeck.push(this.newCard) 
        console.log(this.newCard.cardType);
    }
}

