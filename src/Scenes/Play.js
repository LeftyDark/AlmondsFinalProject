class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {
        this.load.image('card', './assets/smaller_temp_card.png');
        this.load.image('ground','./assets/placeholder_ground.png');
        this.load.image('player', './assets/noun_runningman_10.png');
        this.load.image('platform', './assets/placeholder_platform.png');
        this.load.spritesheet('dashRsprite', './assets/dashR.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('dashLsprite', './assets/dashL.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jumpRsprite', './assets/jumpR.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 14});
        this.load.spritesheet('jumpLsprite', './assets/jumpL.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 14});
        this.load.image('goal', './assets/Sprites/Star.png');
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
        player = new Player(this, game.config.width-400, game.config.height-100, 'dashRsprite');
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, this.ground);
        this.physics.add.collider(player, this.platform);

        // create Goal
        this.goal = new Goal(this, game.config.width - 50, game.config.height - 350, 'goal');
        this.goal.body.immovable = true;
        this.goal.body.allowGravity = false;

        //creating animations
        this.dashRAni = this.anims.create({
            key: 'playerDashR',
            frames: this.anims.generateFrameNumbers('dashRsprite', { start: 0, end: 7, first: 0}),
            frameRate: 8,
            repeat: 0
        });
        this.dashLAni = this.anims.create({
            key: 'playerDashL',
            frames: this.anims.generateFrameNumbers('dashLsprite', { start: 0, end: 7, first: 0}),
            frameRate: 8,
            repeat: 0
        });
        this.jumpLAni = this.anims.create({
            key: 'playerJumpL',
            frames: this.anims.generateFrameNumbers('jumpLsprite', { start: 0, end: 14, first: 0}),
            frameRate: 8,
            repeat: 0
        });
        this.jumpRAni = this.anims.create({
            key: 'playerJumpR',
            frames: this.anims.generateFrameNumbers('jumpRsprite', { start: 0, end: 14, first: 0}),
            frameRate: 8,
            repeat: 0
        });
        

        //creating cards and deck
        cardDeck = [];
        handList = [];
        handSize = 0;
        selectedCardList = [];
        selectedCounter = 0;
        this.add.text(game.config.width/4, game.config.height/2, 'Click on cards to combine them and use their actions! \n Or move left and right with the arrow keys, and jump with SPACEBAR! /n Currently only the move and jump cards work.');
        this.createDeck();
        this.updateHand();
        //let firstCard = this.cardCreateSingle('positive', 'move1L', game.config.width/4, game.config.height-550);
        //let secondCard = this.cardCreateSingle('negative', 'jump', game.config.width/2, game.config.height-550);
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
            if ((selectedCardList[0].charge == 'positive' && selectedCardList[1].charge == 'positive') || (selectedCardList[0].charge == 'negative' && selectedCardList[1].charge == 'negative')) {
                console.log('same charges do not combine');
            }
            else {this.cardCombine(selectedCardList[0],selectedCardList[1], game.config.width*0.8, game.config.height-550);}
            selectedCardList[0].text = '';
            selectedCardList[1].text = '';
            selectedCardList.splice(0, 2);
            //let firstCard = this.cardCreateSingle('none', 'none', game.config.width/4, game.config.height-550);
            //let secondCard = this.cardCreateSingle('none', 'none', game.config.width/2, game.config.height-550);
            handSize -=2;
            this.updateHand();
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
            player.right();
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('appear');
            player.left();
        }
        
        if(this.collisionCheck(player, this.goal)) {
            this.add.text(game.config.width-550, game.config.height-200,
                'You Win!');
        }
    }

    collisionCheck(first, second) {
        if(first.x < second.x + second.width &&
            first.x + first.width > second.x &&
            first.y < second.y + second.height &&
            first.height + first.y > second.y) {
                return true;
            }
            return false;
    }

    determineCardType(type='none') {
        //When a new card is generated, decides what type of card is it.
        //A type can also be inputted initially to create a card of a specific type
        //let typeNum = Phaser.Math.Between(1,8);
        let typeNum = Phaser.Math.Between(1,5); //smaller amount for just working cards
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
    cardCreateSingle(charge='none', type='none', x, y) {
        //creates a card of a card type and charge that is not combined with any other cards
        let cardType, cardCharge;
        if (charge=='none') {let chargeNum = Math.floor(Math.random()*2)
            if (chargeNum == 1) {cardCharge = 'negative'}
            else {cardCharge = 'positive'}
        }
        else {cardCharge = charge}
        if (type=='none') {cardType = this.determineCardType();}
        else {cardType=type}
        let newCard;
        newCard = new Card(this, x, y, 'card', 0, cardType, cardCharge, false).setInteractive();
        this.cardText = this.add.text(0,0, `charge is \n ${newCard.charge} \n type is \n ${newCard.cardType}`);
        this.cardText.setPosition(newCard.x-40, newCard.y);
        newCard.body.allowGravity = false;
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
        for (let type of newCombinedCard.combinedTypeList) {
            if (type == 'move1L') {newCombinedCard.move -=1}
            if (type == 'move3L') {newCombinedCard.move -=3}
            if (type == 'move1R') {newCombinedCard.move +=1}
            if (type == 'move3R') {newCombinedCard.move +=3}
            if (type == 'jump') {newCombinedCard.jump +=1}
            if (type == 'enemy') {newCombinedCard.enemy +=1}
            if (type == 'attack') {newCombinedCard.attack +=1}
            if (type == 'split') {newCombinedCard.split +=1}
        }
        cardDeck.push(newCombinedCard);
        console.log(newCombinedCard.combinedTypeList, newCombinedCard.move, newCombinedCard.jump, newCombinedCard.enemy, newCombinedCard.attack, newCombinedCard.split);
        this.cardText = this.add.text(0,0, `charge is \n ${newCombinedCard.charge} \n types are \n ${newCombinedCard.combinedTypeList}`);
        this.cardText.setPosition(newCombinedCard.x-50, newCombinedCard.y);
        return newCombinedCard;
    }
    playCard(card) {
        //function to run when you want to actual have the card do the actions it can do.
        if (card.combined==false) {card.runSingleType(card.cardType)}
        if (card.combined==true) {card.runCombinedType()}
    }
    drawCard(deck) {
        //selects a random card out of the card deck to be drawn. If no card can be drawn, causes a game over (at this moment, just in the console).
        if (cardDeck.length == 0) {console.log('game over')}
        else {
        let drawnCardNum = Math.floor(Math.random() * deck.length);
        let drawnCard = deck[drawnCardNum];
        switch (handSize) {
            case 0:
                drawnCard.x = game.config.width-950;
                drawnCard.cardText = this.add.text(0,0, `charge is \n ${drawnCard.charge} \n type is \n ${drawnCard.cardType}`);
                drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
                break;
            case 1:
                drawnCard.x = game.config.width-800;
                drawnCard.cardText = this.add.text(0,0, `charge is \n ${drawnCard.charge} \n type is \n ${drawnCard.cardType}`);
                drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
                break;
            case 2:
                drawnCard.x = game.config.width-650;
                drawnCard.cardText = this.add.text(0,0, `charge is \n ${drawnCard.charge} \n type is \n ${drawnCard.cardType}`);
                drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
                break;
            case 3:
                drawnCard.x = game.config.width-500;
                drawnCard.cardText = this.add.text(0,0, `charge is \n ${drawnCard.charge} \n type is \n ${drawnCard.cardType}`);
                drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
                break;
            case 4:
                drawnCard.x = game.config.width-350;
                drawnCard.cardText = this.add.text(0,0, `charge is \n ${drawnCard.charge} \n type is \n ${drawnCard.cardType}`);
                drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
                break;
            default:
                'hand is full'
                break;
        }
        console.log( deck[drawnCardNum]);
        deck.splice(drawnCardNum, 1);
        return drawnCard}
    }
    createDeck() {
        //This functions creates the default deck of cards for the start of the game.
        this.cardCreateSingle('positive', 'move1L', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'move3L', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'move1R', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'move3R', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'jump', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'enemy', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'attack', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('positive', 'split', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'move1L', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'move3L', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'move1R', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'move3R', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'jump', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'enemy', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'attack', game.config.width-5000, game.config.height-550);
        this.cardCreateSingle('negative', 'split', game.config.width-5000, game.config.height-550);
        console.log(cardDeck.length);
    }
    updateHand() {
        //This functions updates the player's hand to make sure it always has five cards. 
        while (handSize < 5) {
            this.drawCard(cardDeck);
            handSize +=1;
        }
    }
}

