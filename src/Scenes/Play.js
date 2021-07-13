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
        this.platform = this.add.group();
        let plat = this.physics.add.sprite(game.config.width-512, game.config.height-300, 'platform').setOrigin(0);
        
        plat.body.immovable = true;
        plat.body.allowGravity = false;
        this.platform.add(plat);

        // this.platform.body.checkCollision.down = false;

        //creating player
        player = new Player(this, game.config.width-400, game.config.height-100, 'player');
        this.physics.add.collider(player, this.ground);
        this.physics.add.collider(player, this.platform);


        //creating cards and deck
        cardDeck = [];
        selectedCardList = [];
        selectedCounter = 0;
        this.add.text(game.config.width/2, game.config.height/2, 'Final Project')
        let firstCard = this.cardCreateSingle('positive', 'move1L', game.config.width/4, game.config.height-200);
        let secondCard = this.cardCreateSingle('negative', 'jump', game.config.width/2, game.config.height-200);
        //let firstCombine = this.cardCombine(firstCard, secondCard);
        //this.playCard(firstCard);
        //this.playCard(firstCombine);
        //this.drawCard(cardDeck)
        
        

        // Spawn Player, Enemy, and Cards

        // Assign key values here
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }
    update() {
        if (selectedCounter == 2) {
        //Once 2 cards have been selected, runs then combines those two cards
            selectedCounter = 0;
            console.log(selectedCardList);
            if (selectedCardList[0].combined == false) {selectedCardList[0].runSingleType(selectedCardList[0].cardType)}
            else {selectedCardList[0].runCombinedType();}
            if (selectedCardList[1].combined == false) {selectedCardList[0].runSingleType(selectedCardList[1].cardType)}
            else {selectedCardList[1].runCombinedType();}
            this.cardCombine(selectedCardList[0],selectedCardList[1], game.config.width*0.8, game.config.height-200); //Need to update this to only combine cards if they should actually combine
            selectedCardList.splice(0, 2);
        }
        // Player has an option to choose 2 cards to play
        // Check is card choices are valid

        // Execute all comands on card
        // Repeat until Player reaches Goal, Falls off a cliff, or collides with an Enemy
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('appear');
            player.jump();
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('appear');
            player.rightOne();
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('appear');
            player.leftOne();
        }
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
    cardCreateSingle(charge, type='none', x, y) {
        //creates a card of a card type and charge that is not combined with any other cards
        let cardType;
        if (type=='none') {cardType = this.determineCardType();}
        else {cardType=type}
        let newCard;
        newCard = new Card(this, x, y, 'card', 0, cardType, charge, false).setInteractive();
        newCard.body.allowGravity = false;
        let self = this;
        newCard.on('pointerdown', function (pointer) {
            selectedCounter +=1;
            selectedCardList.push(newCard);
            console.log('card selected');
        });        
        newCard.combinedTypeList.push(newCard.cardType);
        cardDeck.push(newCard) 
        console.log(newCard.charge, newCard.cardType);
        return newCard
    }
    cardCombine(card1, card2, x, y) {
        //combines 2 cards into a card that performs all the actions of the first card, then 
        //all the actions of the second card.
        //The charge of the combined card is dependant on the charge of the old cards
        let newCharge;
        if (card1.charge == card2.charge) {
            newCharge = card1.charge;
        };
        if (card1.charge == 'positive' && card2.charge == 'negative') {
            newCharge = 'neutral'
        };
        if (card1.charge == 'positive' && card2.charge == 'neutral') {
            newCharge = 'positive'
        }
        if (card1.charge == 'neutral' && card2.charge == 'positive') {
            newCharge = 'positive'
        }
        if (card1.charge == 'neutral' && card2.charge == 'negative') {
            newCharge = 'negative'
        }
        if (card1.charge == 'negative' && card2.charge == 'positive') {
            newCharge = 'neutral'
        }
        if (card1.charge == 'negative' && card2.charge == 'neutral') {
            newCharge = 'negative'
        }
        let newCombinedCard;
        newCombinedCard = new Card(this, x,y, 'card', 0, card1.cardType, newCharge, true).setInteractive();
        newCombinedCard.body.allowGravity = false;
        newCombinedCard.on('pointerdown', function (pointer) {
            selectedCounter +=1;
            selectedCardList.push(newCombinedCard);
            console.log('card selected')
        });        
        for (let type of card1.combinedTypeList) {newCombinedCard.combinedTypeList.push(type)};
        for (let type of card2.combinedTypeList) {newCombinedCard.combinedTypeList.push(type)};
        cardDeck.push(newCombinedCard);
        console.log(newCombinedCard.charge, newCombinedCard.combinedTypeList);
        return newCombinedCard;
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

