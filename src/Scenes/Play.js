class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {
        this.load.image('card', './assets/temp_card_30.png');
        this.load.image('ground','./assets/placeholder_ground.png');
        this.load.image('player', './assets/noun_runningman_10.png');
        this.load.image('platform', './assets/placeholder_platform.png');
        //running person by Kathleen Black from the Noun Project
    }
    create() {
        // loop BGM
        playBGM = this.sound.add('BGMplay');
        playBGM.loop = true;
        playBGM.play();

        this.cameras.main.setBackgroundColor('#CCC');

        //creating ground
        this.ground = this.add.group();
        for( let i = 0; i < game.config.width; i += 20) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 20, 'ground').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        //creating a platform with no bottom collision
        this.platform = this.physics.add.sprite(game.config.width-512, game.config.height-300, 'platform').setOrigin(0);
        this.platform.body.checkCollision.down = false;
        //creating player
        this.player = new Player(this, game.config.width-400, game.config.height-100, 'player');
        this.physics.add.collider(this.player, this.ground);

        //creating cards and deck
        cardDeck = [];
        this.add.text(game.config.width/2, game.config.height/2, 'Final Project')
        let firstCard = this.cardCreateSingle('positive', 'move3L');
        let secondCard = this.cardCreateSingle('negative', 'attack');
        let firstCombine = this.cardCombine(firstCard, secondCard);
        console.log(firstCard.combined, firstCombine.combined);        
        this.playCard(firstCard);
        this.playCard(firstCombine);
        this.drawCard(cardDeck)

        // Spawn Player, Enemy, and Cards
    }
    update() {
        // Player has an option to choose 2 cards to play
        // Check is card choices are valid

        // Execute all comands on card
        // Repeat until Player reaches Goal, Falls off a cliff, or collides with an Enemy
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
        let cardType;
        if (type=='none') {cardType = this.determineCardType(type);}
        else {cardType=type}
        this.newCard = new Card(this, game.config.width/4, game.config.height-200, 'card', 0, cardType, charge, false);
        this.newCard.combinedTypeList.push(this.newCard.cardType);
        cardDeck.push(this.newCard) 
        console.log(this.newCard.charge, this.newCard.cardType);
        return this.newCard
    }
    cardCombine(card1, card2) {
        //combines 2 cards into a card that performs all the actions of the first card, then 
        //all the actions of the second card.
        //The charge of the combined card is dependant on the charge of the old cards
        if (card1.charge == card2.charge) {
            let newCharge = card1.charge;
        };
        if (card1.charge == 'positive' && card2.charge == 'negative') {
            let newCharge = 'neutral'
        };
        if (card1.charge == 'positive' && card2.charge == 'neutral') {
            let newCharge = 'positive'
        }
        if (card1.charge == 'neutral' && card2.charge == 'positive') {
            let newCharge = 'positive'
        }
        if (card1.charge == 'neutral' && card2.charge == 'negative') {
            let newCharge = 'negative'
        }
        if (card1.charge == 'negative' && card2.charge == 'positive') {
            let newCharge = 'neutral'
        }
        if (card1.charge == 'negative' && card2.charge == 'neutral') {
            let newCharge = 'negative'
        }
        this.newCombinedCard = new Card(this, game.config.width/3, game.config.height-200, 'card', 0, card1.cardType, 'neutral', true)
        for (let type of card1.combinedTypeList) {this.newCombinedCard.combinedTypeList.push(type)};
        for (let type of card2.combinedTypeList) {this.newCombinedCard.combinedTypeList.push(type)};
        cardDeck.push(this.newCombinedCard);
        console.log(this.newCombinedCard.charge, this.newCombinedCard.combinedTypeList);
        return this.newCombinedCard;
    }
    playCard(card) {
        //function to run when you want to actual have the card do the actions it can do.
        if (card.combined==false) {card.runSingleType(card.cardType)}
        if (card.combined==true) {card.runCombinedType()}
    }
    drawCard(deck) {
        //selects a random card out of the card deck to be drawn
        let drawnCardNum = Math.floor(Math.random() * deck.length);
        let drawnCard = deck[drawnCardNum]
        console.log( deck[drawnCardNum]);
        deck.splice(drawnCardNum, 1);
        return drawnCard
    }
}

