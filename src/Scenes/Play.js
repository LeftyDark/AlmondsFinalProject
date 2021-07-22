class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {
        this.load.image('card', './assets/smaller_temp_card.png');
        this.load.image('pos_card', './assets/cardplus.png');
        this.load.image('neg_card', './assets/cardminus.png');
        this.load.image('neu_card', './assets/cardneutral.png');
        this.load.image('platform', './assets/platform.jpg');
        this.load.image('wall', './assets/wall.jpg');
        this.load.image('smallplat', './assets/small_plat.jpg');
        this.load.image('medplat', './assets/medplat.jpg');
        this.load.image('miniwall', './assets/miniwall.jpg');
        this.load.image('finalground', './assets/thefloor full.png');
        this.load.spritesheet('dashRsprite', './assets/dashR.png', {frameWidth: 48, frameHeight: 51, startFrame: 0, endFrame: 5});
        this.load.spritesheet('dashLsprite', './assets/dashL.png', {frameWidth: 48, frameHeight: 51, startFrame: 0, endFrame: 5});
        this.load.spritesheet('jumpRsprite', './assets/jumpR.png', {frameWidth: 45, frameHeight: 64, startFrame: 0, endFrame: 33});
        this.load.spritesheet('jumpLsprite', './assets/jumpL.png', {frameWidth: 45, frameHeight: 64, startFrame: 0, endFrame: 33});
        this.load.image('goal', './assets/Sprites/Star.png');
    }
    create() {
        game.settings = {
            enemyspawncommand: false,
            enemyexterminatecommand: false
        };

        //Configure text for in-game
        
        this.cameras.main.setBackgroundColor('#5cb595');

        //game.settings.enemyspawned = false;
        //game.settings.enemyspawncommand = false;

        //creating ground
        this.ground = this.add.group();
        for( let i = 0; i < game.config.width+1500; i += 16) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 16, 'finalground').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        //creating a platform
        this.platform = this.add.group();
        let plat = this.physics.add.sprite(game.config.width-775, game.config.height-300, 'platform').setOrigin(0);
        plat.body.immovable = true;
        plat.body.allowGravity = false;
        this.plat2 = this.physics.add.sprite(game.config.width-100, game.config.height-275, 'platform').setOrigin(0);
        this.plat2.body.immovable = true;
        this.plat2.body.allowGravity = false;
        this.platform.add(plat);
        this.platform.add(this.plat2);
        // this.platform.body.checkCollision.down = false;
        //creating walls to stop the player from moving past the edges
        this.wall = this.add.group();
        this.wall1 = this.physics.add.sprite(game.config.width-1024, game.config.height-700, 'wall').setOrigin(0);
        this.wall1.body.immovable = true;
        this.wall1.body.allowGravity = false;
        this.wall.add(this.wall1);
        this.wall2 = this.physics.add.sprite(game.config.width+1000, game.config.height-700, 'wall').setOrigin(0);
        this.wall2.body.immovable = true;
        this.wall2.body.allowGravity = false;
        this.wall.add(this.wall2);
        this.miniwall = this.physics.add.sprite(game.config.width+650, game.config.height-300, 'miniwall').setOrigin(0);
        this.miniwall.body.immovable = true;
        this.miniwall.body.allowGravity = false;
        this.wall.add(this.miniwall);
        //creating player
        player = new Player(this, game.config.width-900, game.config.height-100, 'player');
        this.physics.add.collider(player, this.ground);
        this.physics.add.collider(player, this.platform);
        this.physics.add.collider(player, this.wall);

        // create Goal
        this.goal = new Goal(this, game.config.width+900, game.config.height-100, 'goal');
        this.goal.body.immovable = true;
        this.goal.body.allowGravity = false;
        gameOver = false;

        //creating animations
        this.dashRAni = this.anims.create({
            key: 'playerDashR',
            frames: this.anims.generateFrameNumbers('dashRsprite', { start: 0, end: 5, first: 0}),
            frameRate: 7,
            repeat: 0
        });
        this.dashLAni = this.anims.create({
            key: 'playerDashL',
            frames: this.anims.generateFrameNumbers('dashLsprite', { start: 0, end: 5, first: 0}),
            frameRate: 7,
            repeat: 0
        });
        this.jumpLAni = this.anims.create({
            key: 'playerJumpL',
            frames: this.anims.generateFrameNumbers('jumpLsprite', { start: 0, end: 16, first: 0}),
            frameRate: 20,
            repeat: 0
        });
        this.jumpRAni = this.anims.create({
            key: 'playerJumpR',
            frames: this.anims.generateFrameNumbers('jumpRsprite', { start: 0, end: 16, first: 0}),
            frameRate: 20,
            repeat: 0
        });
        
        //creating cards and deck
        cardDeck = [];
        handList = [];
        handSize = 0;
        isSplitting = false;
        splitNum = 0;
        numToSpawn = 0;
        numAttacks = 0;
        cardSelected = false;
        card1 = false;
        card2 = false;
        card3 = false;
        card4 = false;
        card5 = false;
        cardPosition = 0;
        selectedCardList = [];
        selectedCounter = 0;
        //this.add.text(game.config.width/4, game.config.height/2-50, 'Click on cards to combine them and use their actions! \n 2 Positive and 2 Negative cards do not combine. \n Or move left and right with the arrow keys, and jump with SPACEBAR! \n Currently only the move and jump cards work. \n The split card partially works, type the number of a card in your hand \n to split it if it is not combined.');
        this.add.text(game.config.width-670, game.config.height-680, 'Hand', textConfig);
        this.add.text(game.config.width-220, game.config.height-680, '1st Selected Card', textConfig);
        this.add.text(game.config.width+354, game.config.height-680, 'Hand', textConfig);
        this.add.text(game.config.width+804, game.config.height-680, '1st Selected Card', textConfig);
        this.add.text(game.config.width-670, game.config.height-650, 'Press R at any time to restart', splitTextConfig);
        this.add.text(game.config.width+354, game.config.height-650, 'Press R at any time to restart', splitTextConfig);
        splitText = this.add.text(game.config.width-600, game.config.height-680, 'Not splitting.', textConfig);
        press1text = this.add.text(game.config.width-980, game.config.height-480, 'Press 1', splitTextConfig);
        press1text.visible = false;
        press2text = this.add.text(game.config.width-830, game.config.height-480, 'Press 2', splitTextConfig);
        press2text.visible = false;
        press3text = this.add.text(game.config.width-680, game.config.height-480, 'Press 3', splitTextConfig);
        press3text.visible = false;
        press4text = this.add.text(game.config.width-530, game.config.height-480, 'Press 4', splitTextConfig);
        press4text.visible = false;
        press5text = this.add.text(game.config.width-380, game.config.height-480, 'Press 5', splitTextConfig);
        press5text.visible = false;
        press1text2 = this.add.text(game.config.width+44, game.config.height-480, 'Press 1', splitTextConfig);
        press1text2.visible = false;
        press2text2 = this.add.text(game.config.width+194, game.config.height-480, 'Press 2', splitTextConfig);
        press2text2.visible = false;
        press3text2 = this.add.text(game.config.width+344, game.config.height-480, 'Press 3', splitTextConfig);
        press3text2.visible = false;
        press4text2 = this.add.text(game.config.width+494, game.config.height-480, 'Press 4', splitTextConfig);
        press4text2.visible = false;
        press5text2 =this.add.text(game.config.width+644, game.config.height-480, 'Press 5', splitTextConfig);
        press5text2.visible = false;
        this.createDeck();
        this.updateHand();
        deckText = this.add.text(game.config.width-950, game.config.height-680, `Cards in deck: ${cardDeck.length}`, textConfig);
        combineText = this.add.text(game.config.width-950, game.config.height-650, 'Cards combined', textConfig);
        combineText.visible = false;
        destroyText = this.add.text(game.config.width-950, game.config.height-650, 'Cards destroyed', splitTextConfig);
        destroyText.visible = false;
        //let firstCard = this.cardCreateSingle('positive', 'move1L', game.config.width/4, game.config.height-550);
        //let secondCard = this.cardCreateSingle('negative', 'jump', game.config.width/2, game.config.height-550);
        //let firstCombine = this.cardCombine(firstCard, secondCard);
        //this.playCard(firstCard);
        //this.playCard(firstCombine);
        //this.drawCard(cardDeck)

        // Spawn Player, Enemy, and Cards
        this.enemyArr = [];
        this.physics.add.collider(this.enemyArr, this.ground);
        this.physics.add.collider(this.enemyArr, this.platform);
        let enemy1 = new Enemy(this, game.config.width-350, 500, 'enemy').setOrigin(0);
        this.enemyArr.push(enemy1);
        let enemy2 = new Enemy(this, game.config.width+650,500, 'enemy').setOrigin(0);
        this.enemyArr.push(enemy2);
        
    

        // Assign key values here
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //Changing how the camera works to enable longer levels.
        camera = this.cameras.main;
    }
    update() {
        if(player.y > game.config.height) {
            player.y = game.config.height - 50;
            player.body.velocity.y = 0;
        }

        //Move camera if player moves off the right edge of the screen. Also moves cards to be on the right screen.
        if (player.x >1024 && player.x<2048) {
            camera.centerOnX(1536);
            cardPosition = 1;
        }
        if (player.x <1025) {
            camera.centerOnX(512);
            cardPosition = 0;
        }
        if (cardPosition == 0) {
            splitText.x = game.config.width-600;
            deckText.x = game.config.width-950;
            combineText.x = game.config.width-950;
            destroyText.x = game.config.width-950;
            for (let card of handList) {
                switch (card.handPosition) {
                    case 1:
                        card.x = game.config.width-950;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 2:
                        card.x = game.config.width-800;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 3:
                        card.x = game.config.width-650;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 4:
                        card.x = game.config.width-500;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 5:
                        card.x = game.config.width-350;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    default:
                        console.log('where is this card lmao')
                        break;
                }
            }
        }
        if (cardPosition == 1) {
            splitText.x = game.config.width+424;
            deckText.x = game.config.width+74;
            combineText.x = game.config.width+74;
            destroyText.x = game.config.width+74;
            for (let card of handList) {
                switch (card.handPosition) {
                    case 1:
                        card.x = game.config.width+74;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 2:
                        card.x = game.config.width+224;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 3:
                        card.x = game.config.width+374;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 4:
                        card.x = game.config.width+524;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    case 5:
                        card.x = game.config.width+674;
                        card.cardText.setPosition(card.x-40, card.y-50);
                        break;
                    default:
                        console.log('where is this card lmao')
                        break;
                }
            }
        }

        if (selectedCounter == 2) {
        //Once 2 cards have been selected, runs then combines those two cards. Keeps track of what positions in the hands open up so cards 
        //should spawn in the same places the used cards were
            selectedCounter = 0;
            if ((selectedCardList[0].charge == 'positive' && selectedCardList[1].charge == 'positive') || (selectedCardList[0].charge == 'negative' && selectedCardList[1].charge == 'negative')) {
                console.log('same charges do not combine');
                this.sound.play('break');
                destroyText.visible = true;
            }
            else {this.cardCombine(selectedCardList[0],selectedCardList[1], game.config.width-5000, game.config.height-550);
            this.sound.play('appear');
            combineText.visible = true;}
            switch (selectedCardList[0].handPosition) {
                case 1:
                    card1 = false;
                    selectedCardList[0].handPosition = 0;
                    break;
                case 2:
                    card2 = false;
                    selectedCardList[0].handPosition = 0;
                    break;
                case 3:
                    card3 = false;
                    selectedCardList[0].handPosition = 0;
                    break;
                case 4:
                    card4 = false;
                    selectedCardList[0].handPosition = 0;
                    break;
                case 5:
                    card5 = false;
                    selectedCardList[0].handPosition = 0;
                    break;
                default:
                    console.log('woah this was not in your hand')
                    break;
            }
            switch (selectedCardList[1].handPosition) {
                case 1:
                    card1 = false;
                    selectedCardList[1].handPosition = 0;
                    break;
                case 2:
                    card2 = false;
                    selectedCardList[1].handPosition = 0;
                    break;
                case 3:
                    card3 = false;
                    selectedCardList[1].handPosition = 0;
                    break;
                case 4:
                    card4 = false;
                    selectedCardList[1].handPosition = 0;
                    break;
                case 5:
                    card5 = false;
                    selectedCardList[1].handPosition = 0;
                    break;
                default:
                    console.log('woah this was not in your hand')
                    break;
            }
            //let firstCard = this.cardCreateSingle('none', 'none', game.config.width/4, game.config.height-550);
            //let secondCard = this.cardCreateSingle('none', 'none', game.config.width/2, game.config.height-550);
            selectedCardList[0].cardText.destroy();
            selectedCardList[1].cardText.destroy();
            handSize -=2;
            this.updateHand();
            if (selectedCardList[0].combined == false) {selectedCardList[0].runSingleType(selectedCardList[0].cardType)}
            else {selectedCardList[0].runCombinedType();}
            if (selectedCardList[1].combined == false) {selectedCardList[0].runSingleType(selectedCardList[1].cardType)}
            else {selectedCardList[1].runCombinedType();}
            selectedCardList[0].destroy();
            selectedCardList[1].destroy();
            selectedCardList.splice(0, 2);
            deckText.destroy();
            deckText = this.add.text(game.config.width-950, game.config.height-680, `Cards in deck: ${cardDeck.length}`, textConfig);
        }
        // Player has an option to choose 2 cards to play
        // Check is card choices are valid

        // enemy spawn if card is chosen
        if (game.settings.enemyspawncommand) {
            var enemyX = this.determineEnemyX();
            var enemyY = Phaser.Math.Between(0,500); // game.config.height - 350
            let enemysprite = new Enemy(this, enemyX, enemyY, 'enemy');
            this.enemyArr.push(enemysprite);
            this.physics.add.collider(this.enemyArr, this.ground);
            this.physics.add.collider(this.enemyArr, this.platform);
            game.settings = {
                enemyspawncommand: false
            };
            numToSpawn-=1;
            if (numToSpawn >0) {game.settings = {enemyspawncommand: true};};
        }
        if (game.settings.enemyexterminatecommand) {
            for (var i = 0; i < this.enemyArr.length; i++) {
                this.diffY = Math.abs(this.enemyArr[i].y - player.y);
                this.diffX = Math.abs(this.enemyArr[i].x - player.x);
                this.dist = Math.sqrt(Math.pow(this.diffY, 2) + Math.pow(this.diffX, 2));
                if(this.dist < 500) { // change this value to change attack radius
                    let enemyText = this.add.text(this.enemyArr[i].x,this.enemyArr[i].y, 'New card obtained!', textConfig);
                    setTimeout(() => {enemyText.destroy();}, 5000)
                    this.enemyArr[i].x = 9999999999;
                    this.enemyArr.splice(i, 1);
                    i--;
                    this.cardCreateSingle('none','none', game.config.width-5000,game.config.height-550);
                    deckText.destroy();
                    deckText = this.add.text(game.config.width-950, game.config.height-680, `Cards in deck: ${cardDeck.length}`, textConfig);
                }
            }
            game.settings = {
                enemyexterminatecommand: false
            };
            numAttacks -=1;
            if (numAttacks>0) {
                game.settings = {enemyexterminatecommand: true}
            }
        }

        //run this function that runs splitting after a split card is played
        if (isSplitting == true) {
            this.splitCard();
        }
        // Execute all comands on card
        // Repeat until Player reaches Goal, Falls off a cliff, or collides with an Enemy
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            player.jump();
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            player.right();
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            player.left();
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if(this.collisionCheck(player, this.goal)) {
            this.add.text(game.config.width-550, game.config.height-200,
                'You Win!');
            this.add.text(game.config.width+474, game.config.height-200, 'You Win!');
            gameOver = true;
        }

        // collision check with enemy
        for (var i = 0; i < this.enemyArr.length; i++) {
            if (this.collisionDistCheckByValue(this.enemyArr[i].x, this.enemyArr[i].y, player.x, player.y)) {
                this.add.text(game.config.width-550, game.config.height-200, 'You Lost because an enemy struck you! \n The game will restart in 5 seconds!', splitTextConfig);
                player.x -=10000;
                gameOver = true;
                setTimeout(() => {this.scene.restart();}, 5000);
            }
        }
    }

    collisionCheck(first, second) {
        return (first.x < second.x + second.width &&
            first.x + first.width > second.x &&
            first.y < second.y + second.height &&
            first.height + first.y > second.y);
    }

    collisionDistCheckByValue(oneX, oneY, twoX, twoY) {
        this.ptDist = Math.sqrt((Math.abs(oneX - twoX) ** 2) + (Math.abs(oneY - twoY) ** 2));
        return (this.ptDist < 75);
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
        if (cardCharge == 'positive') {
            newCard = new Card(this, x, y, 'pos_card', 0, cardType, cardCharge, false).setInteractive();}
        if (cardCharge == 'negative') {
            newCard = new Card(this, x, y, 'neg_card', 0, cardType, cardCharge, false).setInteractive();}
        if (cardCharge == 'neutral') {
            newCard = new Card(this, x, y, 'neu_card', 0, cardType, cardCharge, false).setInteractive();}
        this.cardText = this.add.text(0,0, `type is \n ${newCard.cardType}`);
        this.cardText.setPosition(newCard.x-40, newCard.y-50);
        newCard.body.allowGravity = false;
        newCard.on('pointerdown', function (pointer) {
            if (newCard.selected == false && isSplitting == false && gameOver == false) {
            selectedCounter +=1;
            combineText.visible = false;
            destroyText.visible = false;
            newCard.selected = true;
            if (cardPosition == 0) {newCard.x = game.config.width-127;};
            if (cardPosition == 1) {newCard.x = game.config.width+897;};
            this.cardText.setPosition(newCard.x-40, newCard.y-50);
            selectedCardList.push(newCard);
            this.handNum = handList.indexOf(newCard);
            handList.splice(this.handNum, 1);
            console.log('card selected');}
            else {console.log('already selected or currently using a split card')}
        });
        newCard.combinedTypeList.push(newCard.cardType);
        cardDeck.push(newCard);
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
        if (newCharge == 'positive') {newCombinedCard = new Card(this, x,y, 'pos_card', 0, card1.cardType, newCharge, true).setInteractive();}
        if (newCharge == 'negative') {newCombinedCard = new Card(this, x,y, 'neg_card', 0, card1.cardType, newCharge, true).setInteractive();}
        if (newCharge == 'neutral') {newCombinedCard = new Card(this, x,y, 'neu_card', 0, card1.cardType, newCharge, true).setInteractive();}
        newCombinedCard.body.allowGravity = false;
        newCombinedCard.on('pointerdown', function (pointer) {
            if (newCombinedCard.selected == false && isSplitting == false && gameOver == false) {
            selectedCounter +=1;
            combineText.visible = false;
            destroyText.visible = false;
            newCombinedCard.selected = true;
            if (cardPosition == 0) {newCombinedCard.x = game.config.width-127;};
            if (cardPosition == 1) {newCombinedCard.x = game.config.width+897;};
            newCombinedCard.cardText.setPosition(newCombinedCard.x-40, newCombinedCard.y-50);
            selectedCardList.push(newCombinedCard);
            this.handNum = handList.indexOf(newCombinedCard);
            handList.splice(this.handNum, 1);
            console.log('card selected')}
            else {console.log('already selected or currently using a split card')};
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
        if (newCombinedCard.move >= 0) {
        newCombinedCard.cardText = this.add.text(0,0, `types are: \n Move ${newCombinedCard.move}R\n Jump x${newCombinedCard.jump} \n Enemy x${newCombinedCard.enemy} \n Attack x${newCombinedCard.attack} \n Split x${newCombinedCard.split}`);
        }
        else {newCombinedCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(newCombinedCard.move)}L\n Jump x${newCombinedCard.jump} \n Enemy x${newCombinedCard.enemy} \n Attack x${newCombinedCard.attack} \n Split x${newCombinedCard.split}`);}
        newCombinedCard.cardText.setPosition(newCombinedCard.x-50, newCombinedCard.y-50);
        return newCombinedCard;
    }
    playCard(card) {
        //function to run when you want to actual have the card do the actions it can do.
        if (card.combined==false) {card.runSingleType(card.cardType)}
        if (card.combined==true) {card.runCombinedType()}
    }
    drawCard(deck) {
        //selects a random card out of the card deck to be drawn. If no card can be drawn, causes a game over (at this moment, just in the console).
        if (cardDeck.length == 0) {this.add.text(game.config.width-550, game.config.height-200,
            'You Lost because your Deck is empty... \n The game will restart in 5 seconds!', splitTextConfig);
        this.add.text(game.config.width+474, game.config.height-200, 'You Lost because your Deck is empty... \n The game will restart in 5 seconds!', splitTextConfig)
        gameOver = true;
        setTimeout(() => {this.scene.restart();}, 5000);
    }
        else {
        let drawnCardNum = Math.floor(Math.random() * deck.length);
        let drawnCard = deck[drawnCardNum];
        handList.push(drawnCard);
        if (card1 == false) {
            drawnCard.x = game.config.width-950;
            if (drawnCard.combined == false)
            {drawnCard.cardText = this.add.text(0,0, `type is \n ${drawnCard.cardType}`)}
            else {if (drawnCard.move >= 0) {
                drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${drawnCard.move}R\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)}
                else {
                    drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(drawnCard.move)}L\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)
                }
            };
            drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y-50);
            drawnCard.handPosition = 1;
            card1 = true;
            deck.splice(drawnCardNum, 1);
            return 'card made in hand position 1'
        }
        if (card2 == false) {
            drawnCard.x = game.config.width-800;
            if (drawnCard.combined == false)
            {drawnCard.cardText = this.add.text(0,0, `type is \n ${drawnCard.cardType}`)}
            else {if (drawnCard.move >= 0) {
                drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${drawnCard.move}R\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)}
                else {
                    drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(drawnCard.move)}L\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)
                }
            };
            drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y);
            drawnCard.handPosition = 2;
            card2 = true;
            deck.splice(drawnCardNum, 1);
            return 'card made in hand position 2'     
        }
        if (card3 == false) {
            drawnCard.x = game.config.width-650;
            if (drawnCard.combined == false)
            {drawnCard.cardText = this.add.text(0,0, `type is \n ${drawnCard.cardType}`)}
            else {if (drawnCard.move >= 0) {
                drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${drawnCard.move}R\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)}
                else {
                    drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(drawnCard.move)}L\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)
                }
            };
            drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y-50);
            drawnCard.handPosition = 3;
            card3 = true;
            deck.splice(drawnCardNum, 1);   
            return 'card made in hand position 3'     
        }
        if (card4 == false) {
            drawnCard.x = game.config.width-500;
            if (drawnCard.combined == false)
            {drawnCard.cardText = this.add.text(0,0, `type is \n ${drawnCard.cardType}`)}
            else {if (drawnCard.move >= 0) {
                drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${drawnCard.move}R\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)}
                else {
                    drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(drawnCard.move)}L\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)
                }
            };
            drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y-50);
            drawnCard.handPosition = 4;
            card4 = true;
            deck.splice(drawnCardNum, 1); 
            return 'card made in hand position 4'    
        }
        if (card5 == false) {
            drawnCard.x = game.config.width-350;
            if (drawnCard.combined == false)
            {drawnCard.cardText = this.add.text(0,0, `type is \n ${drawnCard.cardType}`)}
            else {
                if (drawnCard.move >= 0) {
                drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${drawnCard.move}R\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)}
                else {
                    drawnCard.cardText = this.add.text(0,0, `types are: \n Move ${Math.abs(drawnCard.move)}L\n Jump x${drawnCard.jump} \n Enemy x${drawnCard.enemy} \n Attack x${drawnCard.attack} \n Split x${drawnCard.split}`)
                }
            };
            drawnCard.cardText.setPosition(drawnCard.x-40, drawnCard.y-50);
            drawnCard.handPosition = 5;
            card5 = true;
            deck.splice(drawnCardNum, 1);  
            return 'card made in hand position 5'     
        }
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
    }
    updateHand() {
        //This functions updates the player's hand to make sure it always has five cards. 
        while (handSize < 5) {
            this.drawCard(cardDeck);
            handSize +=1;
        }
    }
    splitCard() {
        //This functions splits a card in the hand and only runs when isSplitting is set to be true by a split card.
        let selectedCard;
        splitText.destroy();
        if (cardPosition==0) {splitText = this.add.text(game.config.width-600, game.config.height-680, 'Splitting, type # of card to split it.', splitTextConfig);
            press1text.visible = true;
            press2text.visible = true;
            press3text.visible = true;
            press4text.visible = true;
            press5text.visible = true;}
        if (cardPosition==1) {splitText = this.add.text(game.config.width+424, game.config.height-680, 'Splitting, type # of card to split it.', splitTextConfig);
        press1text2.visible = true;
        press2text2.visible = true;
        press3text2.visible = true;
        press4text2.visible = true;
        press5text2.visible = true;}
        //First, select a card to split by typing the number of the card of that position in your hand
        if (Phaser.Input.Keyboard.JustDown(key1) && cardSelected == false) {
            for (let card of handList) {
                if (card.handPosition == 1) {
                    selectedCard = card;
                    cardSelected = true;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(key2) && cardSelected == false) {
            for (let card of handList) {
                if (card.handPosition == 2) {
                    cardSelected = true;
                    selectedCard = card;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(key3) && cardSelected == false) {
            for (let card of handList) {
                if (card.handPosition == 3) {
                    cardSelected = true;
                    selectedCard = card;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(key4) && cardSelected == false) {
            for (let card of handList) {
                if (card.handPosition == 4) {
                    cardSelected = true;
                    selectedCard = card;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(key5) && cardSelected == false) {
            for (let card of handList) {
                if (card.handPosition == 5) {
                    cardSelected = true;
                    selectedCard = card;
                }
            }
        }
        if (cardSelected == true) {
            isSplitting = false;
            cardSelected = false;
            if (selectedCard.combined == false) {
                switch (selectedCard.handPosition) {
                    case 1:
                        card1 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 2:
                        card2 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 3:
                        card3 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 4:
                        card4 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 5:
                        card5 = false;
                        selectedCard.handPosition = 0;
                        break;
                    default:
                        console.log('woah this was not in your hand')
                        break;
                }
                this.handNum = handList.indexOf(selectedCard);
                handList.splice(this.handNum, 1);
                selectedCard.cardText.destroy();
                selectedCard.destroy();
                handSize-=1;
                this.updateHand();

            }
            if (selectedCard.combined == true) {
                switch (selectedCard.handPosition) {
                    case 1:
                        card1 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 2:
                        card2 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 3:
                        card3 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 4:
                        card4 = false;
                        selectedCard.handPosition = 0;
                        break;
                    case 5:
                        card5 = false;
                        selectedCard.handPosition = 0;
                        break;
                    default:
                        console.log('woah this was not in your hand')
                        break;
                }
                this.handNum = handList.indexOf(selectedCard);
                handList.splice(this.handNum, 1);
                let lastAddedType = selectedCard.combinedTypeList.pop();
                this.cardCreateSingle(selectedCard.charge, lastAddedType, game.config.width-5000, game.config.height-550);
                if (lastAddedType == 'move1L') {selectedCard.move +=1}
                if (lastAddedType == 'move3L') {selectedCard.move +=3}
                if (lastAddedType == 'move1R') {selectedCard.move -=1}
                if (lastAddedType == 'move3R') {selectedCard.move -=3}
                if (lastAddedType == 'jump') {selectedCard.jump -=1}
                if (lastAddedType == 'enemy') {selectedCard.enemy -=1}
                if (lastAddedType == 'attack') {selectedCard.attack -=1}
                if (lastAddedType == 'split') {selectedCard.split -=1}
                selectedCard.cardText.destroy();
                selectedCard.x = game.config.width-5000;
                cardDeck.push(selectedCard);
                handSize -=1;
                this.updateHand();
            }
            deckText.destroy();
            deckText = this.add.text(game.config.width-950, game.config.height-680, `Cards in deck: ${cardDeck.length}`, textConfig);
            splitText.destroy();
            press1text.visible = false;
            press2text.visible = false;
            press3text.visible = false;
            press4text.visible = false;
            press5text.visible = false;
            press1text2.visible = false;
            press2text2.visible = false;
            press3text2.visible = false;
            press4text2.visible = false;
            press5text2.visible = false;
            splitText = this.add.text(game.config.width-600, game.config.height-680, 'Not splitting', textConfig);
            splitNum-=1;
            if (splitNum > 0) {isSplitting = true;}
        }
    }
    determineEnemyX() {
        //This functions decides where the enemy is going to spawn and makes sure it will not spawn on top of the player.
        let x;
        if(player.x < 1024) {
            x = Phaser.Math.Between(30,1000); // game.config.width - 50
        } else {
            x = Phaser.Math.Between(1054,2024); // game.config.width - 50
        }
        if (player.x -x <=150 && player.x -x >=-150) {this.determineEnemyX();}
        else {return x}
    }
}

